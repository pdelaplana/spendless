import { ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';
import { Store, ActionsSubject } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, LoadingController, MenuController } from '@ionic/angular';
import { AppState } from '@app/reducers';
import { CommonUIService } from '@app/services/common-ui.service';
import { AuthActions } from '@app/store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm: FormGroup;

  subscription: Subscription = new Subscription();

  errorMessages = {
    username: [
      { type: 'required', message: 'Username is required'},
      { type: 'minlength', message: 'Username length must be longer than or equal to 6 characters '},
      { type: 'maxlength', message: 'Username length cannot exceed 20 characters '},
      { type: 'pattern', message: 'Please enter valid Username format '},
      { type: 'loginFailed', message: 'Login failed. Please enter a valid email address.'}
    ],
    password: [
      { type: 'required', message: 'Password is required'},
      { type: 'minlength', message: 'Password length must be longer than or equal to 6 characters '},
      { type: 'maxlength', message: 'Password length Cannot exceed 10 characters '},
      { type: 'pattern', message: 'Password must contain numbers,uppercase and lowercase letters '},
      { type: 'loginFailed', message: 'Login failed. Please enter a valid password.'}
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private actions: ActionsSubject,
    private navController: NavController,
    private menuController: MenuController,
    private commonUIService: CommonUIService) {

    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.minLength(10),
        // Validators.maxLength(20),
        // Validators.pattern('^[a-zA-Z0-9_.+-]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.minLength(6),
        // Validators.maxLength(10),
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]))
    });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  ngOnInit() {
    // clear any loading overlays
    this.commonUIService.dismissLoadingPage();
    // disable side menu
    this.menuController.enable(false);
    // subscribe to actions
    this.subscription
    .add(
      this.actions.pipe(ofType(AuthActions.loginSuccess)).subscribe(data => {
        this.menuController.enable(true);
        this.navController.navigateRoot('spending');
      })
    )
    .add(
      this.actions.pipe(ofType(AuthActions.loginFailed)).subscribe(data => {
        this.username.setErrors({ loginFailed: true });
        this.password.setErrors({ loginFailed: true });
        this.loginForm.reset();
        this.commonUIService.notifyError('Login failed.  Please try again.');
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  login() {

    this.store.dispatch(AuthActions.login({
      email: this.username.value,
      password: this.password.value
    }));

  }

}

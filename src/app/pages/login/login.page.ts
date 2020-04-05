import { AuthenticationService } from './../../services/authentication.service';
import { NotificationService } from './../../services/notification.service';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

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
    private navController: NavController,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private loginService: LoginService) {

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
    this.authenticationService.logout();
  }

  goSignup() {
    this.navController.navigateForward('signup');
  }

  login() {

    this.loginService.email = this.username.value;
    this.loginService.password = this.password.value;

    this.loginService.invoke().subscribe(
      result => {
        if (result !== null) {
          this.navController.navigateRoot('spending');
        }
      },
      error => {
        console.log(error);
        this.username.setErrors({ loginFailed: true });
        this.password.setErrors({ loginFailed: true });
        this.loginForm.reset();
        this.notificationService.notify('Login failed.  Please try again.');
      }
    );

  }

}

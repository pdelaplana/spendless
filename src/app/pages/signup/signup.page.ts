import { NotificationService } from './../../services/notification.service';
import { AuthenticationService } from './../../services/authentication.service';
import { SignupService } from './../../services/signup.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  loginForm: FormGroup;

  errorMessages = {
    username: [
      { type: 'required', message: 'Username is required'},
      { type: 'minlength', message: 'Username length must be longer than or equal to 6 characters '},
      { type: 'maxlength', message: 'Username length Cannot exceed 20 characters '},
      { type: 'pattern', message: 'Please enter valid Username format '}
    ],
    email: [
      { type: 'required', message: 'Email is required'},
      { type: 'minlength', message: 'Email length must be longer than or equal to 6 characters '},
      { type: 'maxlength', message: 'Email length Cannot exceed 20 characters '},
      { type: 'pattern', message: 'Please enter valid email format '}
    ],
    password: [
      { type: 'required', message: 'Password is required'},
      { type: 'minlength', message: 'Password length must be longer than or equal to 6 characters '},
      { type: 'maxlength', message: 'Password length Cannot exceed 10 characters '},
      { type: 'pattern', message: 'Password must contain numbers,uppercase and lowercase letters '}
    ],
    confirmPassword: [
      { type: 'required', message: 'Password is required'},
      { type: 'minlength', message: 'Password length must be longer than or equal to 6 characters '},
      { type: 'maxlength', message: 'Password length Cannot exceed 10 characters '},
      { type: 'pattern', message: 'Password must contain numbers,uppercase and lowercase letters '},
      { type: 'notSame', message: 'Password must match '}
    ]
  };

  private checkIfPasswordsMatch(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (confirmPassword.errors && !confirmPassword.errors.notSame) {
      return;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ notSame: true });
    } else {
      confirmPassword.setErrors(null);
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private navController: NavController,
    private notificationService: NotificationService,
    private signupService: SignupService) {

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+.[a-zA-Z0-9.-]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.minLength(6),
        // Validators.maxLength(10),
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.minLength(6),
        // Validators.maxLength(10),
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]))
    },
    {
      validator: this.checkIfPasswordsMatch
    });
  }

  ngOnInit() {
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  get confirmPassword() { return this.loginForm.get('confirmPassword'); }


  signup() {
    this.signupService.email = this.email.value;
    this.signupService.password = this.password.value;

    this.signupService.invoke().subscribe(result => {
      this.notificationService.notify('Sign up completed');
      // this.navController.navigateRoot('spending-list');
    });

  }

}

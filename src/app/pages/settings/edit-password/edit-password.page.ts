import { ofType } from '@ngrx/effects';
import { AppState } from '@app/reducers';
import { Store, ActionsSubject } from '@ngrx/store';
import { AlertController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

import { Component, OnInit, OnDestroy } from '@angular/core';

import { ComponentMessagingService } from '@app/services/component-messaging.service';
import { NotificationService } from '@app/services/notification.service';
import { AuthenticationService } from '@app/services/auth/authentication.service';

import { AuthActions } from '@app/store/auth/auth.actions';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.page.html',
  styleUrls: ['./edit-password.page.scss'],
})
export class EditPasswordPage implements OnInit, OnDestroy {

  email: string;
  oldPassword = new FormControl('', [Validators.required]);
  newPassword = new FormControl('', [Validators.required]);

  subscription: Subscription = new Subscription();

  private reauthenticateAndChangePassword() {
    // reathenticate before saving
    this.store.dispatch(AuthActions.changePassword({
      oldPassword: this.oldPassword.value,
      newPassword: this.newPassword.value,
      email: this.email
    }));
  }

  constructor(
    private alertController: AlertController,
    private store: Store<AppState>,
    private actions: ActionsSubject,
    private authenticationService: AuthenticationService,
    private navController: NavController,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.subscription
    .add(
      this.store.select('accountState').subscribe(accountState => {
        this.email = accountState.data.email;
      })
    )
    .add(
      this.actions.pipe(ofType(AuthActions.changePasswordSuccess)).subscribe(data => {
        this.notificationService.notify('Your password has been changed.');
        this.authenticationService.clear();
        this.navController.navigateRoot('login');
      })
    )
    .add(
      this.actions.pipe(ofType(AuthActions.changePasswordFail)).subscribe(data => {
        this.notificationService.notify('Oops! Something went wrong.  Please try again.');
      })
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async save() {

    const alert = await this.alertController.create({
      header: 'Change Password',
      message: `If you choose to continue, you will be asked to log back in with the new password.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Continue',
          handler: (data) => {
            if (this.newPassword.valid && this.oldPassword.valid) {
              this.reauthenticateAndChangePassword();
            } else {
              return false;
            }
          }
        }
      ]
    });
    await alert.present();

  }


}

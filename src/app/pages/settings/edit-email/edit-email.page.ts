import { ofType } from '@ngrx/effects';
import { AppState } from '@app/reducers';
import { Store, ActionsSubject } from '@ngrx/store';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticationService } from '@app/services/auth/authentication.service';
import { LoginService } from '@app/services/login.service';
import { UpdatedEmailMessage } from '@app/messages/updated-email.message';
import { ChangeEmailService } from '../../../services/auth/change-email.service';
import { EditEmailMessage } from './../../../messages/edit-email.message';
import { NotificationService } from './../../../services/notification.service';
import { ComponentMessagingService } from './../../../services/component-messaging.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

import * as fromAccountActions from '@app/store/account/account.actions';

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.page.html',
  styleUrls: ['./edit-email.page.scss'],
})
export class EditEmailPage implements OnInit, OnDestroy {

  private oldEmail: string;
  email: FormControl = new FormControl('');

  subscription: Subscription = new Subscription();

  private reauthenticateAndChangeEmail(currentPassword: string) {
    this.store.dispatch(fromAccountActions.changeEmail({
      newEmail: this.email.value,
      oldEmail: this.oldEmail,
      password: currentPassword
    }));
  }

  constructor(
    private store: Store<AppState>,
    private actions: ActionsSubject,
    private alertController: AlertController,
    private navController: NavController,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    // subscribe to store action
    this.subscription
    .add(
      this.store.select('accountState').subscribe(accountState => {
        this.email.setValue(accountState.data.email);
        this.oldEmail = accountState.data.email;
      } )
    )
    .add(
      this.actions.pipe(ofType(fromAccountActions.changeEmailSuccess)).subscribe(data => {
        this.notificationService.notify('Your email has been changed.');
        this.authenticationService.clear();
        this.navController.navigateRoot('login');
      })
    )
    .add(
      this.actions.pipe(ofType(fromAccountActions.changeEmailFailed)).subscribe(data => {
        this.notificationService.notify('Oops! Something went wrong.  Please try it again');
      })
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async save() {

    const alert = await this.alertController.create({
      header: 'Re-Enter Password',
      message: `Please re-enter your  password before continuing.
                If you choose to continue, you will be asked to log back in with the new email address.`,
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Enter password'
        },
      ],
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
            if (data.password !== '') {
              this.reauthenticateAndChangeEmail(data.password);
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

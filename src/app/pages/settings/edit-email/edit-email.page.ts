import { AlertController, NavController } from '@ionic/angular';
import { AuthenticationService } from '@app/services/authentication.service';
import { LoginService } from '@app/services/login.service';
import { UpdatedEmailMessage } from '@app/messages/updated-email.message';
import { ChangeEmailService } from './../../../services/change-email.service';
import { EditEmailMessage } from './../../../messages/edit-email.message';0
import { NotificationService } from './../../../services/notification.service';
import { ComponentMessagingService } from './../../../services/component-messaging.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.page.html',
  styleUrls: ['./edit-email.page.scss'],
})
export class EditEmailPage implements OnInit, OnDestroy {

  private oldEmail: string;
  email: FormControl = new FormControl('');

  subscription: Subscription;

  private reauthenticateAndChangeEmail(password: string) {
    // reathenticate before saving
    this.loginService.email = this.oldEmail;
    this.loginService.password = password;
    this.loginService.invoke().subscribe(
      () => {
        this.changeEmailService.email = this.email.value;
        this.changeEmailService.invoke().subscribe(result => {
          this.messagingService.sendMessage(new UpdatedEmailMessage({email: result.email }));
          this.notificationService.notify('Email has been changed.');
          this.authenticationService.logout();
          this.navController.navigateRoot('login');
        });
      },
      () => {
        this.notificationService.notify('Oops! Something went wrong.  Please try again.');
      }

    );
  }

  constructor(
    private alertController: AlertController,
    private navController: NavController,
    private messagingService: ComponentMessagingService,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService,
    private loginService: LoginService,
    private changeEmailService: ChangeEmailService
  ) { }

  ngOnInit() {
     // subscribe to messages
    this.subscription = this.messagingService.currentMessage.subscribe(message => {
        if (message instanceof EditEmailMessage) {
          this.oldEmail = message.payload.email;
          this.email.setValue(message.payload.email);
        }
    });
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

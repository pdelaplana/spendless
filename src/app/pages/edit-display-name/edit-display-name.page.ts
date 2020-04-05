import { UpdatedDisplayNameMessage } from './../../messages/updated-display-name.message';
import { FormControl } from '@angular/forms';
import { NotificationService } from './../../services/notification.service';
import { UpdateAccountService } from './../../services/update-account.service';
import { EditDisplayNameMessage } from './../../messages/edit-display-name.message';
import { ComponentMessagingService } from './../../services/component-messaging.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-display-name',
  templateUrl: './edit-display-name.page.html',
  styleUrls: ['./edit-display-name.page.scss'],
})
export class EditDisplayNamePage implements OnInit, OnDestroy {

  name: FormControl = new FormControl('');

  subscription: Subscription;

  constructor(
    private messagingService: ComponentMessagingService,
    private notificationservice: NotificationService,
    private updateAccountService: UpdateAccountService) { }

  ngOnInit() {
     // subscribe to messages
     this.subscription = this.messagingService.currentMessage.subscribe(message => {
        if (message instanceof EditDisplayNameMessage) {
          this.name.setValue(message.payload.displayName);
        }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  save() {
    this.updateAccountService.name = this.name.value;
    this.updateAccountService.invoke().subscribe(account => {
      this.messagingService.sendMessage(new UpdatedDisplayNameMessage({displayName: this.name.value }));
      this.notificationservice.notify('Name has been changed.');
    });
  }

}

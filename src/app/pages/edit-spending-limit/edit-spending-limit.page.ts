import { UpdatedSpendingLimitMessage } from './../../messages/updated-spending-limit.message';
import { EditSpendingLimitMessage } from '../../messages/edit-spending-limit.message';
import { UpdateAccountService } from '../../services/account/update-account.service';
import { NotificationService } from './../../services/notification.service';
import { ComponentMessagingService } from './../../services/component-messaging.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-edit-spending-limit',
  templateUrl: './edit-spending-limit.page.html',
  styleUrls: ['./edit-spending-limit.page.scss'],
})
export class EditSpendingLimitPage implements OnInit, OnDestroy {

  spendingLimit: FormControl = new FormControl('');

  subscription: Subscription;

  constructor(
    private messagingService: ComponentMessagingService,
    private notificationservice: NotificationService,
    private updateAccountService: UpdateAccountService
  ) { }

  ngOnInit() {
    // subscribe to messages
    this.subscription = this.messagingService.currentMessage.subscribe(message => {
      if (message instanceof EditSpendingLimitMessage) {
        this.spendingLimit.setValue(message.payload.spendingLimit);
      }
  });
  }

  ngOnDestroy()  {
    this.subscription.unsubscribe();
  }

  amountChanged(event: number) {
    this.spendingLimit.setValue(event);
  }


  save() {
    this.updateAccountService.spendingLimit = this.spendingLimit.value;
    this.updateAccountService.invoke().subscribe(account => {
      this.messagingService.sendMessage(new UpdatedSpendingLimitMessage({spendingLimit: account.spendingLimit }));
      this.notificationservice.notify('Your spending limit has been changed.');
    });
  }


}

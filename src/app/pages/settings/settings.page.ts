import { CommonUIService } from './../../services/common-ui.service';
import { UpdatedSpendingLimitMessage } from './../../messages/updated-spending-limit.message';
import { EditSpendingLimitMessage } from '../../messages/edit-spending-limit.message';
import { UpdatedDisplayNameMessage } from './../../messages/updated-display-name.message';
import { EditDisplayNameMessage } from './../../messages/edit-display-name.message';
import { ComponentMessagingService } from './../../services/component-messaging.service';
import { GetAccountService } from '../../services/account/get-account.service';
import { NavController, } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {

  displayName: string;
  email: string;
  spendingLimit: number;

  subscription: Subscription;

  constructor(
    private navController: NavController,
    private commonUIService: CommonUIService,
    private messagingService: ComponentMessagingService,
    private getAccountService: GetAccountService) {
    // check for messahes
    this.subscription = this.messagingService.currentMessage.subscribe(message => {
      if (message instanceof UpdatedDisplayNameMessage) {
        this.displayName = message.payload.displayName;
      }
      if (message instanceof UpdatedSpendingLimitMessage) {
        this.spendingLimit = message.payload.spendingLimit;
      }
    });
  }

  ngOnInit() {
    this.commonUIService.presentLoadingPage();
    this.getAccountService.invoke().subscribe(
      account => {
        this.displayName = account.name;
        this.email = account.email;
        this.spendingLimit = account.spendingLimit;
        this.commonUIService.dismissLoadingPage();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  goToEditDisplayNamePage() {
    this.messagingService.sendMessage(new EditDisplayNameMessage({ displayName: this.displayName }));
    this.navController.navigateForward('settings/edit-display-name');
  }

  goToEditSpendingLimitPage() {
    this.messagingService.sendMessage(new EditSpendingLimitMessage({ spendingLimit: this.spendingLimit }));
    this.navController.navigateForward('settings/edit-spending-limit');
  }


  goToPage(url: string) {
    this.navController.navigateForward(url);
  }

}

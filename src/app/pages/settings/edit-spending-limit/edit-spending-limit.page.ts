import { ofType } from '@ngrx/effects';
import { Store, ActionsSubject } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { AppState } from '@app/reducers';
import * as fromAccountActions from '@app/store/account/account.actions';
import { CurrencyInputComponent } from '@app/components/currency-input/currency-input.component';
import { NotificationService } from '@app/services/notification.service';

@Component({
  selector: 'app-edit-spending-limit',
  templateUrl: './edit-spending-limit.page.html',
  styleUrls: ['./edit-spending-limit.page.scss'],
  providers:[CurrencyInputComponent]
})
export class EditSpendingLimitPage implements OnInit, OnDestroy {

  spendingLimit: FormControl = new FormControl('');

  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private actions: ActionsSubject,
    private notificationservice: NotificationService
  ) { }

  ngOnInit() {
    // subscribe to messages
    this.subscription
      .add(
        this.store.select('accountState').subscribe(accountState => this.spendingLimit.setValue(accountState.data.spendingLimit))
      )
      .add(
        this.actions.pipe(ofType(fromAccountActions.updateAccountSuccess)).subscribe(data => {
          this.notificationservice.notify('Your spending limit has been changed.');
        })
      )
      .add(
        this.actions.pipe(ofType(fromAccountActions.updateAccountFailed)).subscribe(data => {
          this.notificationservice.notify('Oops! Something went wrong.  Please try it again');
        })
      );
  }

  ngOnDestroy()  {
    this.subscription.unsubscribe();
  }

  amountChanged(event: number) {
    this.spendingLimit.setValue(event);
  }

  save() {
    this.store.dispatch(fromAccountActions.updateAccount({ name: '', email: '', spendingLimit: this.spendingLimit.value}));
  }
 

}

import { ofType } from '@ngrx/effects';
import { Store, ActionsSubject } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { NotificationService } from '../../../services/notification.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState } from '@app/reducers';
import * as fromAccountActions from '@app/store/account/account.actions';

@Component({
  selector: 'app-edit-display-name',
  templateUrl: './edit-display-name.page.html',
  styleUrls: ['./edit-display-name.page.scss'],
})
export class EditDisplayNamePage implements OnInit, OnDestroy {

  name: FormControl = new FormControl('');

  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private actions: ActionsSubject,
    private notificationservice: NotificationService,
    ) { }

  ngOnInit() {
    this.subscription
      .add(
        this.store.select('accountState').subscribe(accountState => this.name.setValue(accountState.data.name))
      )
      .add(
        this.actions.pipe(ofType(fromAccountActions.updateAccountSuccess)).subscribe(data => {
          this.notificationservice.notify('Name has been changed.');
        })
      )
      .add(
        this.actions.pipe(ofType(fromAccountActions.updateAccountFailed)).subscribe(data => {
          this.notificationservice.notify('Oops! Something went wrong.  Please try it again');
        })
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  save() {
    this.store.dispatch(fromAccountActions.updateAccount({ name: this.name.value, email : null, spendingLimit: null }));
  }


}

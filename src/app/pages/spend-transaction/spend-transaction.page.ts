import { Component, OnInit,  OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder,  Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { Store, ActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';

import { CategoryAliasPipe } from '@app/helpers/category-alias.pipe';
import { SPEND_CATEGORIES } from '@app/shared/constants';

import { CommonUIService } from '@app/services/common-ui.service';

import { AppState } from '@app/reducers';
import { Spending } from '@app/models/spending';
import { SpendingActions } from '@app/store/spending/spending.actions';



@Component({
  selector: 'app-spend-transaction',
  templateUrl: './spend-transaction.page.html',
  styleUrls: ['./spend-transaction.page.scss'],
  providers: [CategoryAliasPipe]
})
export class SpendTransactionPage implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  spendCategories = SPEND_CATEGORIES;

  spendTransactionForm: FormGroup;

  id = '';
  precision = 2;
  month: string;
  year: string;

  private create() {
    const spending = <Spending>{
      category: this.category.value,
      amount: this.spendAmount.value,
      date: this.spendDate.value,
      description: this.description.value,
      location: this.location.value,
      notes: this.notes.value
    }
    this.store.dispatch(SpendingActions.addSpending({spending}));
  }

  private update() {
    const spending = <Spending>{
      id: this.id,
      category: this.category.value,
      amount: this.spendAmount.value,
      date: this.spendDate.value,
      description: this.description.value,
      location: this.location.value,
      notes: this.notes.value
    }
    this.store.dispatch(SpendingActions.updateSpending({spending}));
  }


  constructor(
    private store: Store<AppState>,
    private actions: ActionsSubject,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private commonUIService: CommonUIService,
    
  ) {
    this.spendTransactionForm = this.formBuilder.group({
      spendDate: [new Date().toISOString(),  Validators.required],
      spendAmount: [0, Validators.required],
      description: ['', Validators.required],
      location: [''],
      category: ['N', Validators.required],
      notes: ['']
    });

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription
      .add(
        this.actions.pipe(
          ofType(
            SpendingActions.addSpendingSuccess, 
            SpendingActions.addSpendingSuccessOutOfBounds
          )
        ).subscribe(action => {
          this.modalController.dismiss({
            dismissed: true,
          });
          this.commonUIService.notify('Your spending has been saved.');
        })
      )
      .add(
        this.actions.pipe(
          ofType(
            SpendingActions.addSpendingFailed, 
            SpendingActions.updateSpendingFailed
          )
        ).subscribe(action => {
          this.commonUIService.notify('Oops.  Something went wrong.  Please try again.');
        })
      )
      .add(
        this.actions.pipe(
          ofType(
            SpendingActions.updateSpendingSuccess, 
            SpendingActions.updateSpendingSuccessOutOfBounds
          )
        ).subscribe(action => {
          this.modalController.dismiss({
            dismissed: true,
          });
          this.commonUIService.notify('Your spending has been saved.');
        })
      );
  }


  get spendDate() { return this.spendTransactionForm.get('spendDate'); }
  set spendDate(value: any) { this.spendTransactionForm.get('spendDate').setValue(value); }

  get spendAmount() { return this.spendTransactionForm.get('spendAmount'); }
  set spendAmount(value: any) { this.spendTransactionForm.get('spendAmount').setValue(value); }

  get description() { return this.spendTransactionForm.get('description'); }
  set description(value: any) {  this.spendTransactionForm.get('description').setValue(value); }

  get location() { return this.spendTransactionForm.get('location'); }
  set location(value: any) { this.spendTransactionForm.get('location').setValue(value); }

  get category() { return this.spendTransactionForm.get('category'); }
  set category(value: any) { this.spendTransactionForm.get('category').setValue(value); }

  get notes() { return this.spendTransactionForm.get('notes'); }
  set notes(value: any) { this.spendTransactionForm.get('notes').setValue(value); }

  close() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  amountChanged(event: number) {
    this.spendTransactionForm.controls.spendAmount.setValue(event);
  }

  save() {

    if (!this.spendTransactionForm.valid) {
      this.commonUIService.notify('Please complete missing information before saving.');
      return;
    }

    if (this.id !== '') {
      this.update();
    } else {
      this.create();
    }
  }
}


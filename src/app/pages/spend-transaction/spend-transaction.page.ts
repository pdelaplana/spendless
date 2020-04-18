import { UpdateSpendingService } from '../../services/spending/update-spending.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { CreateSpendingService } from '../../services/spending/create-spending.service';
import { NotificationService } from './../../services/notification.service';


@Component({
  selector: 'app-spend-transaction',
  templateUrl: './spend-transaction.page.html',
  styleUrls: ['./spend-transaction.page.scss'],
})
export class SpendTransactionPage implements OnInit {

  spendTransactionForm: FormGroup;

  id = '';
  precision = 2;

  private create() {
    this.createSpendingService.category = this.category.value;
    this.createSpendingService.amount = this.spendAmount.value;
    this.createSpendingService.date = this.spendDate.value;
    this.createSpendingService.description = this.description.value;
    this.createSpendingService.location = this.location.value;
    this.createSpendingService.notes = this.notes.value;

    this.createSpendingService.invoke().subscribe(
      spending => {
        this.modalController.dismiss({
          dismissed: true,
          spending: {
            date: spending.date,
            amount: spending.amount,
            description: spending.description,
            location: spending.location,
            category: spending.category,
            notes: spending.notes
          }
        });
        this.notificationService.notify('Your spending has been saved.');
      });

  }

  private update() {
    this.updateSpendingService.id = this.id;
    this.updateSpendingService.category = this.category.value;
    this.updateSpendingService.amount = this.spendAmount.value;
    this.updateSpendingService.date = this.spendDate.value;
    this.updateSpendingService.description = this.description.value;
    this.updateSpendingService.location = this.location.value;
    this.updateSpendingService.notes = this.notes.value;

    this.updateSpendingService.invoke().subscribe(
      spending => {
        this.modalController.dismiss({
          dismissed: true,
          spending: {
            id: spending.id,
            date: spending.date,
            amount: spending.amount,
            description: spending.description,
            location: spending.location,
            category: spending.category,
            notes: spending.notes
          }
        });
        this.notificationService.notify('Your spending has been saved.');
      });
  }


  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private navParams: NavParams,
    private notificationService: NotificationService,
    private createSpendingService: CreateSpendingService,
    private updateSpendingService: UpdateSpendingService
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

  ngOnInit() {
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
      this.notificationService.notify('Please complete missing information before saving.');
      return;
    }

    if (this.id !== '') {
      this.update();
    } else {
      this.create();
    }
  }
}


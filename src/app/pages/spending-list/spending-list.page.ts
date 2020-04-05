import { Observable } from 'rxjs';
import { GetAccountService } from './../../services/get-account.service';
import { AuthenticationService } from './../../services/authentication.service';
import { NotificationService } from './../../services/notification.service';
import { DeleteSpendingService } from './../../services/delete-spending.service';
import { Spending } from '@app/models/spending';
import { GetSpendingService } from './../../services/get-spending.service';
import { SpendTransactionPage } from '../../pages/spend-transaction/spend-transaction.page';
import { Component, OnInit, IterableDiffer, IterableDiffers, DoCheck, IterableChangeRecord, ViewChild } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { KeyValue } from '@angular/common';
import * as moment from 'moment';


@Component({
  selector: 'app-spending-list',
  templateUrl: './spending-list.page.html',
  styleUrls: ['./spending-list.page.scss']
})
export class SpendingListPage implements OnInit, DoCheck {

  totalAvailableToSpendAmount = 0;
  totalSpendAmount = 0;
  totalNeedsAmount = 0;
  totalWantsAmount = 0;
  totalCultureAmount = 0;
  totalUnexpectedAmount = 0;

  spendingPeriod = new Date();

  transactions: Spending[] = new Array();
  transactionsGroupedByDate: { date: string, spending: Spending[]}[];

  @ViewChild('picker', {static: true}) picker;

  private iterableDiffer: IterableDiffer<Spending> | null;

  private groupBy(array: Spending[]): { date: string, spending: Spending[]}[] {
    return  array.sort((a: Spending, b: Spending) => {
      const dateA = a.date !== null ? new Date(a.date).getTime() : 0;
      const dateB = b.date !== null ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    })
    .reduce((groups: { date: string, spending: Spending[]}[], thisSpending: Spending) => {
      const thisDate = new Date(thisSpending.date).toDateString();
      let found = groups.find(group => group.date === thisDate);
      if (found === undefined) {
        found = { date: thisDate, spending: [] };
        groups.push(found);
      }
      found.spending.push(thisSpending);
      return groups;
    }, []);
  }

  private getTotalSpend(transactions: Spending[]) {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
  }

  private getTotalofCategory(transactions: Spending[], category: string) {
    // tslint:disable-next-line: max-line-length
    return transactions.filter(transaction => transaction.category === category).reduce((total, transaction) => total + transaction.amount, 0);
  }

  private revaluateTotals(transactions: Spending[]) {
    this.totalSpendAmount = this.getTotalSpend(transactions);
    this.totalNeedsAmount = this.getTotalofCategory(transactions, 'N');
    this.totalWantsAmount = this.getTotalofCategory(transactions, 'W');
    this.totalCultureAmount = this.getTotalofCategory(transactions, 'C');
    this.totalUnexpectedAmount = this.getTotalofCategory(transactions, 'U');
  }

  private async fillTransactions() {
    const loader = await this.loadingController.create({
      message: 'Please wait...'
    });
    loader.present();
    this.getSpendingService.month = moment(this.spendingPeriod).format('MMM');
    this.getSpendingService.year = moment(this.spendingPeriod).format('YYYY');
    this.getSpendingService.invoke().subscribe(
      spendingAll => {
        this.transactions = spendingAll;
        loader.dismiss();
      });
  }

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private iterable: IterableDiffers,
    private authenticationService: AuthenticationService,
    private getSpendingService: GetSpendingService,
    private deleteSpendingService: DeleteSpendingService,
    private notificationService: NotificationService) {
    }

  ngOnInit() {

    this.iterableDiffer = this.iterable.find(this.transactions).create();

    this.authenticationService.accountChanges.subscribe(account => {
      this.totalAvailableToSpendAmount = account.spendingLimit;
      this.fillTransactions();
    });

    // this.getAccountService.invoke().subscribe(account => {
      // this.totalAvailableToSpendAmount = account.spendingLimit;
    // });

  }

  ngDoCheck() {

    const changes = this.iterableDiffer.diff(this.transactions);

    if (changes) {

      this.transactionsGroupedByDate = this.groupBy(this.transactions);
      this.revaluateTotals(this.transactions);

      changes.forEachAddedItem((record: IterableChangeRecord<Spending>) => {
        // do something
      });

      changes.forEachRemovedItem((record: IterableChangeRecord<Spending>) => {
        // this.renderer.removeClass(this.host.nativeElement, record.item);
      });
    }
  }


  dateChanged(date) {
    this.spendingPeriod = moment(date).endOf('month').toDate();
    this.fillTransactions();
  }

  async addSpendTransaction() {
    const modal = await this.modalController.create({
      component: SpendTransactionPage
    });
    modal.onDidDismiss().then((result) => {
      if (result !== null) {
        this.transactions.push(result.data.spending);
      }
    });
    return await modal.present();
  }

  async editSpendTransaction(spending: Spending) {
    const modal = await this.modalController.create({
      component: SpendTransactionPage,
      componentProps: {
        id: spending.id,
        spendDate: spending.date,
        spendAmount: spending.amount,
        description: spending.description,
        location: spending.location,
        category: spending.category,
        notes: spending.notes
      }
    });
    modal.onDidDismiss().then((result) => {
      if (result !== null) {
        const transaction = this.transactions.find(t => t.id === result.data.spending.id);
        transaction.amount = result.data.spending.amount;
        transaction.date = result.data.spending.date;
        transaction.description = result.data.spending.description;
        transaction.location = result.data.spending.location;
        transaction.category = result.data.spending.category;
        transaction.notes = result.data.spending.notes;
        console.log(result.data.spending);
      }
    });
    return await modal.present();
  }

  async deleteSpendTransaction(id: string) {

    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to delete this record.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.deleteSpendingService.id = id;
            this.deleteSpendingService.invoke().subscribe(
              result => {
                const index = this.transactions.findIndex(t => t.id === id);
                this.transactions.splice(index, 1);
                this.notificationService.notify('Your spending has been deleted.');
              });
          }
        }
      ]
    });
    await alert.present();
  }

  viewNotifications() {
    this.navCtrl.navigateForward('notifications');
  }

}

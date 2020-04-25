import { GetAccountService } from '@app/services/account/get-account.service';
import { CommonUIService } from '@app/services/common-ui.service';
import { AuthenticationService } from '@app/services/authentication.service';
import { DeleteSpendingService } from '@app/services/spending/delete-spending.service';
import { Spending } from '@app/models/spending';
import { GetSpendingService } from '@app/services/spending/get-spending.service';
import { SpendTransactionPage } from '@app/pages/spend-transaction/spend-transaction.page';
import { Component, OnInit, IterableDiffer, IterableDiffers, DoCheck, IterableChangeRecord, ViewChild } from '@angular/core';
import { NavController, ModalController, AlertController,  IonInfiniteScroll } from '@ionic/angular';
import * as moment from 'moment';


@Component({
  selector: 'app-spending-list',
  templateUrl: './spending-list.page.html',
  styleUrls: ['./spending-list.page.scss']
})
export class SpendingListPage implements OnInit, DoCheck {

  private initialDataLoaded: false;

  totalAvailableToSpendAmount = 1000;
  totalSpendAmount = 0;
  totalNeedsAmount = 0;
  totalWantsAmount = 0;
  totalCultureAmount = 0;
  totalUnexpectedAmount = 0;

  spendingPeriod = new Date();

  transactions: Spending[] = new Array();
  transactionsGroupedByDate: { date: string, spending: Spending[]}[];

  @ViewChild('picker', {static: true}) picker;
  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

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
    return this.totalAvailableToSpendAmount - transactions.reduce((total, transaction) => total + transaction.amount, 0);
  }

  private getTotalofCategory(transactions: Spending[], category: string) {
    // tslint:disable-next-line: max-line-length
    return transactions.filter(transaction => transaction.category === category).reduce((total, transaction) => total + transaction.amount, 0);
  }

  private revaluateTotals(transactions: Spending[]) {
    this.totalSpendAmount =  this.getTotalSpend(transactions);
    this.totalNeedsAmount = this.getTotalofCategory(transactions, 'N');
    this.totalWantsAmount = this.getTotalofCategory(transactions, 'W');
    this.totalCultureAmount = this.getTotalofCategory(transactions, 'C');
    this.totalUnexpectedAmount = this.getTotalofCategory(transactions, 'U');
  }

  private async fillTransactions() {
    return new Promise((resolve, reject) => {
      this.getSpendingService.month = moment(this.spendingPeriod).format('MMM');
      this.getSpendingService.year = moment(this.spendingPeriod).format('YYYY');
      this.getSpendingService.lastDocId = this.transactions.length > 0 ? this.transactions[this.transactions.length - 1].id : null;
      // this.getSpendingService.offset = this.transactions.length || 0;
      // this.getSpendingService.size = 3;
      this.getSpendingService.invoke().subscribe(
        spendingAll => {
          spendingAll.forEach((spending) => this.transactions.push(spending) );
          resolve(spendingAll);
        },
        () => {
          console.log('error');
        }
      );
    });
  }

  constructor(
    private navController: NavController,
    private alertController: AlertController,
    private modalController: ModalController,
    private iterable: IterableDiffers,
    private commonUIService: CommonUIService,
    private authenticationService: AuthenticationService,
    private getAccountService: GetAccountService,
    private getSpendingService: GetSpendingService,
    private deleteSpendingService: DeleteSpendingService) {
}

  ngOnInit() {

    this.iterableDiffer = this.iterable.find(this.transactions).create();

    this.commonUIService.presentLoadingPage();
    this.getAccountService.invoke().subscribe(account => {
      this.totalAvailableToSpendAmount = account.spendingLimit;
      this.fillTransactions().then(result => {
         this.commonUIService.dismissLoadingPage();
      });
    });

    // TODO: Temporarily disable paging logic

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
    this.transactions = [];
    this.commonUIService.presentLoadingPage();
    this.fillTransactions().then(result => {
      this.commonUIService.dismissLoadingPage();
    });
  }

  async addSpendTransaction() {
    const modal = await this.modalController.create({
      component: SpendTransactionPage
    });
    modal.onDidDismiss().then((result) => {
      if (result !== null) {
        const startDate = moment(this.transactionsGroupedByDate[this.transactionsGroupedByDate.length - 1].date).toDate();
        // const startDate = moment(this.spendingPeriod).startOf('month').toDate();
        const endDate = moment(this.spendingPeriod).endOf('month').toDate();
        if (moment(result.data.spending.date).toDate() >= startDate && moment(result.data.spending.date).toDate() <= endDate) {
          this.transactions.push(result.data.spending);
        }

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
        // const startDate = moment(this.spendingPeriod).startOf('month').toDate() ;
        const startDate = moment(this.transactionsGroupedByDate[this.transactionsGroupedByDate.length - 1].date).toDate();
        const endDate = moment(this.spendingPeriod).endOf('month').toDate();
        const transaction = this.transactions.find(t => t.id === result.data.spending.id);

        if (moment(result.data.spending.date).toDate() < startDate || moment(result.data.spending.date).toDate() > endDate){
          // remove transactions
          this.transactions = this.transactions.filter(t => t.id !== transaction.id);
        } else {
          transaction.amount = result.data.spending.amount;
          transaction.date = result.data.spending.date;
          transaction.description = result.data.spending.description;
          transaction.location = result.data.spending.location;
          transaction.category = result.data.spending.category;
          transaction.notes = result.data.spending.notes;

          // force refresh of the list since iterablediff does not detect changes in objects 
          // we could however use a keyValueDiff for use cases like this
          this.transactionsGroupedByDate = this.groupBy(this.transactions);
          this.revaluateTotals(this.transactions);
        }
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
                this.commonUIService.notify('Your spending has been deleted.');
              });
          }
        }
      ]
    });
    await alert.present();
  }

  loadData(event) {
    /*
    console.log('scrolling...');
    this.fillTransactions().then(result => {
        event.target.complete();
        console.log('data loaeded');
        console.log('event.target.disabled', event.target.disabled);
    });

    setTimeout(() => {
    }, 500);
    */
  }

  viewNotifications() {
    this.navController.navigateForward('notifications');
  }

}

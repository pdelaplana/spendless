
import { Component, OnInit, IterableDiffer, IterableDiffers, DoCheck, IterableChangeRecord, ViewChild, OnDestroy } from '@angular/core';
import { NavController, ModalController, AlertController,  IonInfiniteScroll } from '@ionic/angular';

import { Subscription } from 'rxjs';

import * as moment from 'moment';

import { Store, ActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';

import { SPEND_CATEGORIES } from '@app/shared/constants';
import { CommonUIService } from '@app/services/common-ui.service';
import { Spending } from '@app/models/spending';
import { GetSpendingService } from '@app/services/spending/get-spending.service';
import { SpendTransactionPage } from '@app/pages/spend-transaction/spend-transaction.page';

import { AppState } from '@app/reducers';
import { SpendingActions }  from '@app/store/spending/spending.actions';


@Component({
  selector: 'app-spending-list',
  templateUrl: './spending-list.page.html',
  styleUrls: ['./spending-list.page.scss']
})
export class SpendingListPage implements OnInit, OnDestroy, DoCheck {

  private initialDataLoaded: false;
  private subscription: Subscription = new Subscription();
  
  spendingCategories = SPEND_CATEGORIES;

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

  private loadData() {
    const month = moment(this.spendingPeriod).format('MMM'),
          year = moment(this.spendingPeriod).format('YYYY');
    this.store.dispatch(SpendingActions.loadSpendingByMonth({month, year}));
  }


  constructor(
    private store: Store<AppState>,
    private actions: ActionsSubject,
    private navController: NavController,
    private alertController: AlertController,
    private modalController: ModalController,
    private iterable: IterableDiffers,
    private commonUIService: CommonUIService,
    
    private getSpendingService: GetSpendingService
  ) {
}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {

    this.iterableDiffer = this.iterable.find(this.transactions).create();

    this.subscription
      .add(
        this.store.select('accountState').subscribe(accountState => {
          if (!accountState.loading) {
            this.totalAvailableToSpendAmount = accountState.data.spendingLimit;
            this.loadData();
          }
        })
      )
      .add(
        this.store.select('spendingState').subscribe(state => {
          if (!state.loading) {
            this.transactions = [];
            state.data.forEach((spending) => this.transactions.push(spending) );
            this.commonUIService.dismissLoadingPage();
          } else {
            this.commonUIService.presentLoadingPage();
          }
        })
      )
      .add(
        this.actions.pipe(
          ofType(SpendingActions.deleteSpendingSuccess)
        ).subscribe(action => {
          this.commonUIService.notify('Your spending has been deleted.');
        })
      )
      .add(
        this.actions.pipe(ofType(SpendingActions.loadSpendingByMonthFailed, SpendingActions.deleteSpendingFailed)).subscribe(action => {
          this.commonUIService.notifyError('Oops!  Something went wrong.  Please try it again.');
        })
      )
    
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
    this.loadData();
  }

  async addSpendTransaction() {
    const modal = await this.modalController.create({
      component: SpendTransactionPage,
      componentProps: {
        month: moment(this.spendingPeriod).format('M'),
        year: moment(this.spendingPeriod).format('YYYY')
      }
    });
   
    return await modal.present();
  }

  async editSpendTransaction(spending: Spending) {
    const modal = await this.modalController.create({
      component: SpendTransactionPage,
      componentProps: {
        month: moment(this.spendingPeriod).format('M'),
        year: moment(this.spendingPeriod).format('YYYY'),
        id: spending.id,
        spendDate: spending.date,
        spendAmount: spending.amount,
        description: spending.description,
        location: spending.location,
        category: spending.category,
        notes: spending.notes
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
           return true;
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.store.dispatch(SpendingActions.deleteSpending({ id }));
          }
        }
      ]
    });
    await alert.present();
  }

  
  viewNotifications() {
    this.navController.navigateForward('notifications');
  }

}

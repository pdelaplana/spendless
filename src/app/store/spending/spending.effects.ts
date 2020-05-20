import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, merge, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, exhaustMap, withLatestFrom, flatMap } from 'rxjs/operators';

import { SpendingActions } from '@app/store/spending/spending.actions';

import { GetSpendingService } from '@app/services/spending/get-spending.service';
import { CreateSpendingService } from '@app/services/spending/create-spending.service';
import { UpdateSpendingService } from '@app/services/spending/update-spending.service';


import { Spending } from '@app/models/spending';
import { AppState } from '@app/reducers';

import * as moment from 'moment';
import { DeleteSpendingService } from '@app/services/spending/delete-spending.service';


@Injectable()
export class SpendingEffects {
  constructor(
    private actions: Actions,
    private store: Store<AppState>,
    private getSpendingService: GetSpendingService,
    private createSpendingService: CreateSpendingService,
    private updateSpendingService: UpdateSpendingService,
    private deleteSpendingService: DeleteSpendingService
  ) {}

  private getTotalofCategory(transactions: Spending[], category: string) {
    // tslint:disable-next-line: max-line-length
    return transactions.filter(transaction => transaction.category === category).reduce((total, transaction) => total + transaction.amount, 0);
  }

  private dateInMonth(date: Date, month:string, year:string): boolean {
    const spendingDate = `${year}-1-${month}`;
    const startDate = moment(spendingDate, 'YYYY-DD-MMM').toDate();
    const endDate = moment(spendingDate, 'YYYY-DD-MMM').endOf('month').toDate();
    return (moment(date).toDate() >= startDate && moment(date).toDate() <= endDate)
  }

  @Effect()
  loadSpendingByMonth = this.actions.pipe(
    ofType(SpendingActions.loadSpendingByMonth),
    mergeMap((action) => {
      this.getSpendingService.month = action.month;
      this.getSpendingService.year = action.year;
      return this.getSpendingService.invoke().pipe(
        map(result => {
          return SpendingActions.loadSpendingByMonthSuccess({spending: result})
        })
      );
    }),
    catchError((error, caught) => {
      return of(SpendingActions.loadSpendingByMonthFailed({error}));
    })
  );

  @Effect()
  addSpending = this.actions.pipe(
    ofType(SpendingActions.addSpending),
    withLatestFrom(
      this.store.select('spendingState')
    ),
    switchMap(([action, state]) => {
      
      this.createSpendingService.category = action.spending.category;
      this.createSpendingService.amount = action.spending.amount;
      this.createSpendingService.date = action.spending.date;
      this.createSpendingService.description = action.spending.description;
      this.createSpendingService.location = action.spending.location;
      this.createSpendingService.notes = action.spending.notes;

      return this.createSpendingService.invoke().pipe(
        map(result => {
          if (this.dateInMonth(result.date, state.month, state.year)) {
            return SpendingActions.addSpendingSuccess({spending: result});
          } else {
            return SpendingActions.addSpendingSuccessOutOfBounds();
          }
        })
      );

    }),
    catchError((error, caught) => {
      return of(SpendingActions.addSpendingFailed({error}))
    })
  );

  @Effect()
  updateSpending = this.actions.pipe(
    ofType(SpendingActions.updateSpending),
    withLatestFrom(
      this.store.select('spendingState')
    ),
    switchMap(([action, state]) => {
      
      this.updateSpendingService.id = action.spending.id;
      this.updateSpendingService.category = action.spending.category;
      this.updateSpendingService.amount = action.spending.amount;
      this.updateSpendingService.date = action.spending.date;
      this.updateSpendingService.description = action.spending.description;
      this.updateSpendingService.location = action.spending.location;
      this.updateSpendingService.notes = action.spending.notes;

      return this.updateSpendingService.invoke().pipe(
        map(result => {
          if (this.dateInMonth(result.date, state.month, state.year)) {
            return SpendingActions.updateSpendingSuccess({spending: result});
          } else {
            return SpendingActions.updateSpendingSuccessOutOfBounds();
          }
        })
      );

    }),
    catchError((error, caught) => {
      return of(SpendingActions.updateSpendingFailed({error}))
    })
  );

  @Effect()
  deleteSpending = this.actions.pipe(
    ofType(SpendingActions.deleteSpending),
    mergeMap(action => {
      
      this.deleteSpendingService.id = action.id;
            
      return this.deleteSpendingService.invoke().pipe(
        map(result => {
          return SpendingActions.deleteSpendingSuccess({ id: action.id });
        })
      );

    }),
    catchError((error, caught) => {
      return of(SpendingActions.deleteSpendingFailed({error}))
    })
  );



}

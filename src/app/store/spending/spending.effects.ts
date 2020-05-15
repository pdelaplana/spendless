import { GetSpendingService } from './../../services/spending/get-spending.service';
import { Store } from '@ngrx/store';


import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, merge, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, exhaustMap, withLatestFrom, flatMap } from 'rxjs/operators';
import * as fromSpendingActions from '@app/store/spending/spending.actions';

import { UpdateAccountService } from '@app/services/account/update-account.service';
import { GetAccountService } from '@app/services/account/get-account.service';
import { AppState } from '@app/reducers';

@Injectable()
export class SpendingEffects {
  constructor(
    private actions: Actions,
    private store: Store<AppState>,
    private getSpendingService: GetSpendingService
  ) {}

  @Effect()
  loadSpendingByMonth = this.actions.pipe(
    ofType(fromSpendingActions.loadSpendingByMonth),
    mergeMap((action) => {
      this.getSpendingService.month = action.month;
      this.getSpendingService.year = action.year;
      return this.getSpendingService.invoke().pipe(
        map(result => fromSpendingActions.loadSpendingByMonthSuccess({spending: result}))
      );
    }),
    catchError((error, caught) => {
      return of(fromSpendingActions.loadSpendingByMonthFailed({error}));
    })
  );

 



}

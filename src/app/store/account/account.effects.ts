import { LoginService } from '@app/services/login.service';
import { updateAccount } from './account.actions';
import { Store } from '@ngrx/store';
import { ChangeEmailService } from './../../services/auth/change-email.service';


import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, merge } from 'rxjs';
import { catchError, map, mergeMap, switchMap, exhaustMap, withLatestFrom, flatMap } from 'rxjs/operators';
import * as fromAccountActions from '@app/store/account/account.actions';

import { UpdateAccountService } from '@app/services/account/update-account.service';
import { GetAccountService } from '@app/services/account/get-account.service';
import { AppState } from '@app/reducers';

@Injectable()
export class AccountEffects {
  constructor(
    private actions: Actions,
    private store: Store<AppState>,
    private getAccountService: GetAccountService,
    private updateAccountService: UpdateAccountService,
    private changeEmailService: ChangeEmailService,
    private loginService: LoginService
  ) {}

  @Effect()
  loadAccount = this.actions.pipe(
    ofType(fromAccountActions.loadAccount),
    mergeMap(() =>
      this.getAccountService.invoke().pipe(
        map(result => {
          return fromAccountActions.loadAccountSuccess({account: result});
        }),
        catchError((error, caught) => {
          fromAccountActions.loadAccountFailed({err: error});
          return EMPTY;
        })
      )
    )
  );

  @Effect()
  updateAccount = this.actions.pipe(
    ofType(fromAccountActions.updateAccount),
    mergeMap(action => {
      this.updateAccountService.name = action.name;
      this.updateAccountService.email = action.email;
      this.updateAccountService.spendingLimit = action.spendingLimit;
      return this.updateAccountService.invoke().pipe(
        map(result => {
          return fromAccountActions.updateAccountSuccess({account: result});
        }),
        catchError((error, caught) => {
          fromAccountActions.updateAccountFailed({err: error});
          return EMPTY;
        })
      );
    })
  );

  @Effect()
  changeEmail = this.actions.pipe(
    ofType(fromAccountActions.changeEmail),
    flatMap(action => {
      this.changeEmailService.email = action.newEmail;
      this.updateAccountService.email = action.newEmail;
      this.loginService.email = action.oldEmail;
      this.loginService.password = action.password;

      return this.loginService.invoke().pipe(
        flatMap(() => {
          return this.changeEmailService.invoke().pipe(
            flatMap((auth) => {
              return this.updateAccountService.invoke().pipe(
                map((account) => {
                  return fromAccountActions.changeEmailSuccess({ newEmail: account.email });
                })
              );
            })
          );
        }),
        catchError((error, caught) => {
          fromAccountActions.changeEmailFailed({err: error});
          return null;
        })
      );
    })
  );



}

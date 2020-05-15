import { NGXLogger } from 'ngx-logger';

import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as fromAccount from '@app/store/account/account.reducer';
import * as fromAuth from '@app/store/auth/auth.reducer';
import * as fromSpending from '@app/store/spending/spending.reducer';
import { Actions } from '@ngrx/effects';

export interface AppState {
  authState: fromAuth.AuthState;
  accountState: fromAccount.AccountState;
  spendingState: fromSpending.SpendingState;
}

export function loggerFactory(logger: NGXLogger): MetaReducer<AppState> {
  return (reducer: ActionReducer<AppState, Action>) => {
    return (state, action) => {
      logger.info('action', action);
      logger.debug('state', state);
      return reducer(state, action);
    };
  };
}



export const reducers: ActionReducerMap<AppState> = {
  authState: fromAuth.reducer,
  accountState: fromAccount.reducer,
  spendingState: fromSpending.reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];



export const selectAccountState = (state: AppState) => state.accountState;

export const selectAccountData =  createSelector(
  selectAccountState,
  (state: fromAccount.AccountState) => state.data
);

export const selectAccountName = createSelector(
  selectAccountState,
  (state: fromAccount.AccountState) => state.data.name
);

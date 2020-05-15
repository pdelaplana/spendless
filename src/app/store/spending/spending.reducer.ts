
import { Spending } from '@app/models/spending';
import { Account } from '@app/models/account';
import { Action, createReducer, on } from '@ngrx/store';
import * as fromSpendingActions from './spending.actions';

export interface SpendingState {
  loading: boolean;
  data: Spending[];
  error: any;
}

export const initialState: SpendingState = {
  loading: false,
  data: [],
  error: null
};


const accountReducer = createReducer(
  initialState,
  on(fromSpendingActions.loadSpendingByMonth, (state, {month, year}) => ({...state, loading: true})),
  on(fromSpendingActions.loadSpendingByMonthSuccess, (state, {spending}) => ({...state, loading: false, spending  })),
  on(fromSpendingActions.loadSpendingByMonthFailed, (state, {error}) => ({...state, loading: false, error })),

);

export function reducer(state: SpendingState | undefined, action: Action) {
  return accountReducer(state, action);
}


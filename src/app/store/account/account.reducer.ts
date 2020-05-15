import { Account } from '@app/models/account';
import { Action, createReducer, on } from '@ngrx/store';
import * as fromAccountActions from './account.actions';

export interface AccountState {
  loading: boolean;
  data: Account;
  error: any;
}

export const initialState: AccountState = {
  loading: false,
  data: new Account(),
  error: null
};


const accountReducer = createReducer(
  initialState,
  on(fromAccountActions.loadAccount, state => ({...state, loading: true})),
  on(fromAccountActions.loadAccountSuccess, (state, {account}) => ({...state, loading: false, data: account  })),
  on(fromAccountActions.loadAccountFailed, (state, {err}) => ({...state, loading: false, error: err  })),
  on(fromAccountActions.updateAccountSuccess, (state, {account}) => ({...state, loading: false, data: account  })),
  on(fromAccountActions.updateAccountFailed, (state, {err}) => ({...state, loading: false, error: err  })),
  on(fromAccountActions.changeEmailSuccess, (state, {newEmail}) => ({
    ...state, loading: false, data: { ...state.data, email: newEmail }
  })),
  on(fromAccountActions.changeEmailFailed, (state, {err}) => ({
    ...state, loading: false, error: err
  })),
);

export function reducer(state: AccountState | undefined, action: Action) {
  return accountReducer(state, action);
}


import { Account } from '@app/models/account';
import { Action, createReducer, on } from '@ngrx/store';
import { AccountActions } from './account.actions';
import { AccountState } from './account.state';



export const initialState: AccountState = {
  loading: false,
  data: new Account(),
  error: null
};


const accountReducer = createReducer(
  initialState,
  on(AccountActions.loadAccount, state => ({...state, loading: true})),
  on(AccountActions.loadAccountSuccess, (state, {account}) => ({...state, loading: false, data: account  })),
  on(AccountActions.loadAccountFailed, (state, {err}) => ({...state, loading: false, error: err  })),
  on(AccountActions.updateAccountSuccess, (state, {account}) => ({...state, loading: false, data: account  })),
  on(AccountActions.updateAccountFailed, (state, {err}) => ({...state, loading: false, error: err  })),
  on(AccountActions.changeEmailSuccess, (state, {newEmail}) => ({
    ...state, loading: false, data: { ...state.data, email: newEmail }
  })),
  on(AccountActions.changeEmailFailed, (state, {err}) => ({
    ...state, loading: false, error: err
  })),
);

export function reducer(state: AccountState | undefined, action: Action) {
  return accountReducer(state, action);
}


import { AuthUserInfo } from './../../shared/auth-user-info';
import { Account } from '@app/models/account';
import { Action, createReducer, on } from '@ngrx/store';
import * as fromAuthActions from './auth.actions';

export interface AuthState {
  loading: boolean;

  isAuthenticated: boolean;
  isTokenExpired: boolean;

  expiresIn: string;
  expiresOn: Date;

  error: any;

}

export const initialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  isTokenExpired: false,

  expiresIn: '',
  expiresOn: null,
  error: null

};


const authReducer = createReducer(
  initialState,
  on(fromAuthActions.loginSuccess, (state, {expiresIn, expiresOn}) => ({
    ...state,
    expiresIn,
    expiresOn,
    isAuthenticated: true,
    isTokenExpired: false
  })),
  on(fromAuthActions.logoutSuccess, (state) => ({
    ...state,
    expiresIn: null,
    expiresOn: null,
    isAuthenticated: false,
    isTokenExpired: true
  })),
  on(fromAuthActions.refreshToken, state => ({...state, loading: true })),
  on(fromAuthActions.refreshTokenSuccess, state => ({...state, isAuthenticated: true, hasTokenExpired: false }))
  // on(fromAccountActions.loadAccountSuccess, (state, {account}) => ({...state, loading: false, data: account  })),
  // on(fromAccountActions.loadAccountFailed, (state, {err}) => ({...state, loading: false, error: err  })),
  // on(fromAccountActions.updateAccountSuccess, (state, {account}) => ({...state, loading: false, data: account  })),
  // on(fromAccountActions.updateAccountFailed, (state, {err}) => ({...state, loading: false, error: err  })),

);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}


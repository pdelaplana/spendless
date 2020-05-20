
import { Action, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthState } from './auth.state';



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
  on(AuthActions.loginSuccess, (state, {expiresIn, expiresOn}) => ({
    ...state,
    expiresIn,
    expiresOn,
    isAuthenticated: true,
    isTokenExpired: false
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    expiresIn: null,
    expiresOn: null,
    isAuthenticated: false,
    isTokenExpired: true
  })),
  on(AuthActions.refreshToken, state => ({...state, loading: true })),
  on(AuthActions.refreshTokenSuccess, state => ({...state, isAuthenticated: true, hasTokenExpired: false }))

);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}


import { AuthUserInfo } from './../../shared/auth-user-info';
import { Action, createAction, props } from '@ngrx/store';


export const refreshToken = createAction(
  '[Auth] Refresh Token'
);

export const refreshTokenSuccess = createAction(
  '[Auth] Refresh Token Success',
  props<{isAuthenticated: boolean, hasTokenExpired: boolean }>()
);

export const refreshTokenFailure = createAction(
  '[Auth] Refresh Token Failure'
);

export const login = createAction(
  '[Auth] Login',
  props<{email: string; password: string}>()
);

export const loginSuccess = createAction(
  '[Auth] Login success',
  props<{ expiresIn: string, expiresOn: Date }>()
);

export const loginFailed = createAction(
  '[Auth] Login failed',
  props<{err: any}>()
);

export const logout = createAction(
  '[Auth] Logout'
);

export const logoutSuccess = createAction(
  '[Auth] Logout success'
);

export const changePassword = createAction(
  '[Auth] Change password',
  props<{email: string, oldPassword: string, newPassword: string}>()
);

export const changePasswordSuccess = createAction(
  '[Auth] Change password success',
  props<{ expiresIn: string, expiresOn: Date }>()
);

export const changePasswordFail = createAction(
  '[Auth] Change password failed',
  props<{ error: any }>()
);

export const sendPasswordReset = createAction(
  '[Auth] Send password reset'
)

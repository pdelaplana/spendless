import { AuthUserInfo } from './../../shared/auth-user-info';
import { Action, createAction, props } from '@ngrx/store';

export const AuthActions = {

  refreshToken: createAction(
    '[Auth] Refresh Token'
  ),
  
  refreshTokenSuccess: createAction(
    '[Auth] Refresh Token Success',
    props<{isAuthenticated: boolean, hasTokenExpired: boolean }>()
  ),
  
  refreshTokenFailure: createAction(
    '[Auth] Refresh Token Failure'
  ),
  
  login: createAction(
    '[Auth] Login',
    props<{email: string; password: string}>()
  ),
  
  loginSuccess: createAction(
    '[Auth] Login success',
    props<{ expiresIn: string, expiresOn: Date }>()
  ),
  
  loginFailed: createAction(
    '[Auth] Login failed',
    props<{err: any}>()
  ),
  
  logout: createAction(
    '[Auth] Logout'
  ),
  
  logoutSuccess: createAction(
    '[Auth] Logout success'
  ),
  
  changePassword: createAction(
    '[Auth] Change password',
    props<{email: string, oldPassword: string, newPassword: string}>()
  ),
  
  changePasswordSuccess: createAction(
    '[Auth] Change password success',
    props<{ expiresIn: string, expiresOn: Date }>()
  ),
  
  changePasswordFail: createAction(
    '[Auth] Change password failed',
    props<{ error: any }>()
  ),
  
  sendPasswordReset: createAction(
    '[Auth] Send password reset'
  )
  

}


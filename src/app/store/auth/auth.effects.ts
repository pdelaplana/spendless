
import { ChangePasswordService } from './../../services/auth/change-password.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, flatMap } from 'rxjs/operators';

import { AuthActions } from '@app/store/auth/auth.actions';
import { AuthenticationService } from '@app/services/auth/authentication.service';
import { LoginService } from '@app/services/login.service';


@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private loginService: LoginService,
    private changePasswordService: ChangePasswordService,
    private authenticationService: AuthenticationService
  ) {}

  @Effect()
  login = this.actions.pipe(
    ofType(AuthActions.login),
    mergeMap(action => {
      this.loginService.email = action.email;
      this.loginService.password = action.password;

      return this.loginService.invoke().pipe(
        map((authUserInfo) => {
          return AuthActions.loginSuccess({
            expiresIn: authUserInfo.expiresIn,
            expiresOn: authUserInfo.expiresOn
          });
        }),
      );
    }),
    catchError((error) => {
      return of(AuthActions.loginFailed({err: error}));
    })
  );

  @Effect()
  logout = this.actions.pipe(
    ofType(AuthActions.logout),
    map(() => {
      this.authenticationService.clear();
      return AuthActions.logoutSuccess();
    })
  );

  @Effect()
  changePassword = this.actions.pipe(
    ofType(AuthActions.changePassword),
    flatMap(action => {
      this.loginService.email = action.email;
      this.loginService.password = action.oldPassword;
      this.changePasswordService.oldPassword = action.oldPassword;
      this.changePasswordService.newPassword = action.newPassword;
      return this.loginService.invoke().pipe(
        flatMap(() => {
          return this.changePasswordService.invoke().pipe(
            map((auth) => {
              return AuthActions.changePasswordSuccess({
                expiresIn: auth.expiresIn,
                expiresOn: auth.expiresOn});
            })
          );
        }),
        catchError((error, caught) => {
          AuthActions.changePasswordFail({ error });
          return null;
        })
      );
    })
  );

}

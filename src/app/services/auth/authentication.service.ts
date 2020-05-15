import { Account } from '@app/models/account';
import { AuthUserInfo } from '../../shared/auth-user-info';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private getAuthUserInfoProperty(key: string): string {
    const authUserInfo = JSON.parse(localStorage.getItem('authUserInfo'));
    if (authUserInfo !== null) {
      return authUserInfo[key];
    } else {
      return '';
    }
  }
  constructor() { }

  get isAuthenticated(): boolean {
    const authUserInfo = JSON.parse(localStorage.getItem('authUserInfo'));
    return (authUserInfo !== null);
  }

  get hasTokenExpired(): boolean {
    const authUserInfo = JSON.parse(localStorage.getItem('authUserInfo')) as AuthUserInfo;
    return (authUserInfo === null) || moment().isAfter(authUserInfo.expiresOn);
  }


  get authUserInfo(): AuthUserInfo { return JSON.parse(localStorage.getItem('authUserInfo')); }
  set authUserInfo(value: AuthUserInfo) { localStorage.setItem('authUserInfo', JSON.stringify(value) ); }

  get idToken(): string { return this.getAuthUserInfoProperty('idToken'); }
  get localId(): string { return this.getAuthUserInfoProperty('localId'); }

  clear() {
    localStorage.removeItem('authUserInfo');
    // this.account = null;
  }

}

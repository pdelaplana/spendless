import { Account } from '@app/models/account';
import { AuthUserInfo } from './../shared/auth-user-info';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private accountSubject = new BehaviorSubject<Account>(new Account());

  accountChanges = this.accountSubject.asObservable();

  private getAuthUserInfoProperty(key: string): string {
    const authUserInfo = JSON.parse(localStorage.getItem('authUserInfo'));
    if (authUserInfo !== null) {
      return authUserInfo[key];
    } else {
      return '';
    }
  }
  constructor() { }

  get isAuthenticated() {
    const authUserInfo = JSON.parse(localStorage.getItem('authUserInfo'));
    return (authUserInfo !== null);
  }


  set account(value: Account) { this.accountSubject.next(value); }

  get authUserInfo(): AuthUserInfo { return JSON.parse(localStorage.getItem('authUserInfo')); }
  set authUserInfo(value: AuthUserInfo) { localStorage.setItem('authUserInfo', JSON.stringify(value) ); }

  get idToken(): string { return this.getAuthUserInfoProperty('idToken'); }
  get localId(): string { return this.getAuthUserInfoProperty('localId'); }

  logout() {
    localStorage.removeItem('authUserInfo');
  }

}

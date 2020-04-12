import { CreateAccountService } from './account/create-account.service';
import { AuthUserInfo } from './../shared/auth-user-info';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private endpoint = `${environment.authUrl}accounts:signUp?key=${environment.firebaseApiKey}`;

  email: string;
  password: string;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private createAccountService: CreateAccountService) { }

  invoke(): Observable<any> {
    const request = {
      email: this.email,
      password: this.password,
      returnSecureToken: true
    };
    return this.http.post<AuthUserInfo>( this.endpoint, request )
      .pipe(
        map(result => {
          console.log(result);
          this.authenticationService.authUserInfo = {
            idToken : result.idToken,
            refreshToken : result.refreshToken,
            localId : result.localId,
            email : result.email,
            expiresIn : result.expiresIn
          };
          this.createAccountService.email = result.email;
          this.createAccountService.invoke().subscribe(response => {
            console.log('Account: ', response);
            // this.authenticationService.account = response;
          });
        }),
      );
  }
}

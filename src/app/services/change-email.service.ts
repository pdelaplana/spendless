import { ErrorHandlerService } from '@app/services/error-handler.service';
import { UpdateAccountService } from './account/update-account.service';
import { NGXLogger } from 'ngx-logger';
import { map, catchError } from 'rxjs/operators';
import { AuthUserInfo } from './../shared/auth-user-info';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ChangeEmailService {
  private endpoint = `${environment.authUrl}accounts:update?key=${environment.firebaseApiKey}`;

  email: string;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private updateAccountService: UpdateAccountService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  invoke(): Observable<any> {
    const request = {
      email: this.email,
      idToken: this.authenticationService.idToken,
      returnSecureToken: true
    };
    return this.http.post<AuthUserInfo>(this.endpoint, request)
      .pipe(
        map(result => {
          this.authenticationService.authUserInfo = {
            idToken : result.idToken,
            refreshToken : result.refreshToken,
            localId : result.localId,
            email : result.email,
            expiresIn : result.expiresIn,
            expiresOn : moment().add(result.expiresIn, 's').toDate()
          };
          this.updateAccountService.email = result.email;
          this.updateAccountService.invoke().subscribe(response => {
            this.authenticationService.account = response;
          });
          return result;
        }),

        catchError((error, caught) => {
          this.errorHandlerService.handleError('ChangeEmailService', error);
          return null;
        })

      );

  }
}

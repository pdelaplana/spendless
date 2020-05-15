import { NGXLogger } from 'ngx-logger';
import { AuthUserInfo } from './../shared/auth-user-info';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/services/auth/authentication.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RefreshAuthTokenService {
  private endpoint = `${environment.refreshUrl}?key=${environment.firebaseApiKey}`;

  constructor(
    private logger: NGXLogger,
    private http: HttpClient,
    private authenticationService: AuthenticationService,
  ) { }

  invoke(): Observable<any> {
    const request = {
      grant_type: 'refresh_token',
      refresh_token: this.authenticationService.authUserInfo.refreshToken,
    };
    return this.http.post<any>( this.endpoint, request )
      .pipe(

        map(result => {
          this.logger.log('RefreshAuthTokenService => Got New Token', result);
          this.authenticationService.authUserInfo = {
            idToken : result.id_token,
            refreshToken : result.refresh_token,
            localId : result.user_id,
            email : '',
            expiresIn : result.expires_in,
            expiresOn : moment().add(result.expire_in, 's').toDate()
          };
          return result;
        }),

        catchError((error, caught) => {
          // this.handleAuthError(error);
          this.logger.error('RefreshAuthTokenService => error', error);
          return null;
        })

      );
  }
}

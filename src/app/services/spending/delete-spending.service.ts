import { HandleAuthErrorService } from '../handle-auth-error.service';
import { AuthenticationService } from '../authentication.service';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '@app/shared/api-response';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class DeleteSpendingService {

  private endpoint = `${environment.apiUrl}spending`;

  id: string;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private handleAuthErrorService: HandleAuthErrorService,
    private logger: NGXLogger) { }

  invoke(): Observable<boolean> {
    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authenticationService.idToken}`)
    };
    return this.http.delete<ApiResponse>( `${this.endpoint}/?id=${this.id}` , header )
      .pipe(
        map(result => result.data as boolean ),
        catchError((error, caught) => {
          this.handleAuthErrorService.handleError(error);
          this.logger.error(error);
          return throwError(error);
        })
      );
  }
}

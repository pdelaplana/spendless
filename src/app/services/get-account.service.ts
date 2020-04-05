import { ErrorHandlerService } from './error-handler.service';
import { map, catchError } from 'rxjs/operators';
import { ApiResponse } from '@app/shared/api-response';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { Account } from '@app/models/account';

@Injectable({
  providedIn: 'root'
})
export class GetAccountService {
  private endpoint = environment.apiUrl + 'accounts';

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }

  invoke(): Observable<Account> {
    return this.http.get<ApiResponse>( `${this.endpoint}` )
        .pipe(
          map(
            result => result.data as Account
          ),
          catchError((error, caught) => {
            this.errorHandlerService.handleError(error);
            return throwError(error);
          })
        );
  }
}

import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '@app/models/account';
import { ApiResponse } from '@app/shared/api-response';
import { ErrorHandlerService } from '@app/services/error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class UpdateAccountService {
  private endpoint = environment.apiUrl + 'accounts';

  name: string;
  spendingLimit: number;

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }

  invoke(): Observable<Account> {
    const request = {
      name: this.name,
      spendingLimit: this.spendingLimit
    };
    console.log('UpdateAccountService.invoke().request', request);
    return this.http.put<ApiResponse>( `${this.endpoint}` , request )
      .pipe(
        map(result => result.data as Account ),
        tap(result => console.log('UpdateAccountService -> Account', result)),
        catchError((error, caught) => {
          this.errorHandlerService.handleError(error);
          return throwError(error);
        })
      );
  }
}

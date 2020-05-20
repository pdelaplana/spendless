import { ErrorHandlerService } from '../error-handler.service';
import { HandleAuthErrorService } from '../handle-auth-error.service';
import { AuthenticationService } from '../auth/authentication.service';
import { map, catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '@app/shared/api-response';
import { Spending } from '@app/models/spending';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GetSpendingService {
  private endpoint = environment.apiUrl + 'spending';

  month: string;
  year: string;
  lastDocId: string = null;
  size: number = null;

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }

  invoke(): Observable<Spending[]> {
    const url = `${this.endpoint}/?m=${this.month}&y=${this.year}`
      + (this.lastDocId !== null ? `&last=${this.lastDocId}` : '')
      + (this.size !== null ? `&size=${this.size}` : '');
    return this.http.get<ApiResponse>( url )
        .pipe(
          map(
            result => result.data as Spending[]
          ),
          catchError((error, caught) => {
            this.errorHandlerService.handleError(error);
            return throwError(error);
          })
        );
  }
}

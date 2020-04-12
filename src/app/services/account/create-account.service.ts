import { map } from 'rxjs/operators';
import { ApiResponse } from '@app/shared/api-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {
  private endpoint = `${environment.apiUrl}accounts`;

  email: string;
  spendingLimit: number;

  constructor(private http: HttpClient) { }

  invoke(): Observable<Account> {
    const request = {
      name: this.email,
      email: this.email,
      spendingLimit: this.spendingLimit || 1000,
    };
    return this.http.post<ApiResponse>( `${this.endpoint}`, request )
      .pipe(
        map(result => result.data as Account ),
      );
  }

}

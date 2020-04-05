import { AuthenticationService } from './authentication.service';


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { ApiResponse } from '@app/shared/api-response';
import { Spending } from '@app/models/spending';

@Injectable({
  providedIn: 'root'
})
export class CreateSpendingService {

  private endpoint = environment.apiUrl + 'spending';

  date: Date;
  amount: number;
  description: string;
  location: string;
  category: string;
  notes: string;

  private validate() {
    return true;
  }

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  invoke(): Observable<Spending> {

    if (this.validate()) {
     
      const request = {
        date: this.date,
        amount: this.amount,
        description: this.description,
        location: this.location,
        category : this.category,
        notes: this.notes
      };
      return this.http.post<ApiResponse>( `${this.endpoint}`, request )
        .pipe(
          map(result => result.data as Spending ),
        );
    }


  }


}

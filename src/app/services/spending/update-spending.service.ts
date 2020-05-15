import { AuthenticationService } from '../auth/authentication.service';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../../shared/api-response';
import { Spending } from '@app/models/spending';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateSpendingService {

  private endpoint = environment.apiUrl + 'spending';

  id: string;
  date: Date;
  amount: number;
  description: string;
  location: string;
  category: string;
  notes: string;

  private validate() {
    return true;
  }

  constructor(private http: HttpClient) { }

  invoke(): Observable<Spending> {

    if (this.validate()) {

      const request = {
        id: this.id,
        date: this.date,
        amount: this.amount,
        description: this.description,
        location: this.location,
        category : this.category,
        notes: this.notes
      };
      return this.http.put<ApiResponse>( `${this.endpoint}` , request )
        .pipe(
          map(result => result.data as Spending ),
        );
    }


  }
}

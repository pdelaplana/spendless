import { Subject } from 'rxjs';
import { Account } from '@app/models/account';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataCacheService {

  accountChanges = new Subject<Account>();
  account: Account;

  constructor() { }
}

import { TestBed } from '@angular/core/testing';

import { AccountStoreService } from './account-store.service';

describe('AccountStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountStoreService = TestBed.get(AccountStoreService);
    expect(service).toBeTruthy();
  });
});

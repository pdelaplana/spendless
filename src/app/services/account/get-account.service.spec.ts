import { TestBed } from '@angular/core/testing';

import { GetAccountService } from './get-account.service';

describe('GetAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetAccountService = TestBed.get(GetAccountService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UpdateAccountService } from './update-account.service';

describe('UpdateAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateAccountService = TestBed.get(UpdateAccountService);
    expect(service).toBeTruthy();
  });
});

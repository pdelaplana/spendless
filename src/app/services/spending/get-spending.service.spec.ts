import { TestBed } from '@angular/core/testing';

import { GetSpendingService } from './get-spending.service';

describe('GetSpendingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetSpendingService = TestBed.get(GetSpendingService);
    expect(service).toBeTruthy();
  });
});

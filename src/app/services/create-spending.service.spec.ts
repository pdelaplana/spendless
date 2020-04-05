import { TestBed } from '@angular/core/testing';

import { CreateSpendingService } from './create-spending.service';

describe('CreateSpendTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateSpendingService = TestBed.get(CreateSpendingService);
    expect(service).toBeTruthy();
  });
});

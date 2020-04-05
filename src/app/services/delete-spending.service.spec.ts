import { TestBed } from '@angular/core/testing';

import { DeleteSpendingService } from './delete-spending.service';

describe('DeleteSpendingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteSpendingService = TestBed.get(DeleteSpendingService);
    expect(service).toBeTruthy();
  });
});

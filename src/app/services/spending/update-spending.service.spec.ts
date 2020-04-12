import { TestBed } from '@angular/core/testing';

import { UpdateSpendingService } from './update-spending.service';

describe('UpdateSpendingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateSpendingService = TestBed.get(UpdateSpendingService);
    expect(service).toBeTruthy();
  });
});

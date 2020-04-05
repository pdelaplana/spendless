import { TestBed } from '@angular/core/testing';

import { HandleAuthErrorService } from './handle-auth-error.service';

describe('HandleAuthErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HandleAuthErrorService = TestBed.get(HandleAuthErrorService);
    expect(service).toBeTruthy();
  });
});

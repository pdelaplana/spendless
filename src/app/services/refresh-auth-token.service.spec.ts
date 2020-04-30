import { TestBed } from '@angular/core/testing';

import { RefreshAuthTokenService } from './refresh-auth-token.service';

describe('RefreshAuthTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefreshAuthTokenService = TestBed.get(RefreshAuthTokenService);
    expect(service).toBeTruthy();
  });
});

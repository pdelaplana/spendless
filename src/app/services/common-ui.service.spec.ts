import { TestBed } from '@angular/core/testing';

import { CommonUIService } from './common-ui.service';

describe('CommonUIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonUIService = TestBed.get(CommonUIService);
    expect(service).toBeTruthy();
  });
});

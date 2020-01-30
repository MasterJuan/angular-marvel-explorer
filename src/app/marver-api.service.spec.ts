import { TestBed } from '@angular/core/testing';

import { MarverApiService } from './marver-api.service';

describe('MarverApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarverApiService = TestBed.get(MarverApiService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AapApiService } from './aap-api.service';

describe('AapApiService', () => {
  let service: AapApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AapApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

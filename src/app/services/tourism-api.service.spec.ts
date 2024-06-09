import { TestBed } from '@angular/core/testing';

import { TourismApiService } from './tourism-api.service';

describe('TourismApiService', () => {
  let service: TourismApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourismApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PeruviansService } from './peruvians.service';

describe('PeruviansService', () => {
  let service: PeruviansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeruviansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RouteCheckerService } from './route-checker.service';

describe('RouteCheckerService', () => {
  let service: RouteCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SwapiServiceService } from './swapi-service.service';

describe('SwapiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SwapiServiceService = TestBed.get(SwapiServiceService);
    expect(service).toBeTruthy();
  });
});

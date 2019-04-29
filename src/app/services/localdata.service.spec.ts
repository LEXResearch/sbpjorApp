import { TestBed } from '@angular/core/testing';

import { LocaldataService } from './localdata.service';

describe('LocaldataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocaldataService = TestBed.get(LocaldataService);
    expect(service).toBeTruthy();
  });
});

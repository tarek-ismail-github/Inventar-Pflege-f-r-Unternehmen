import { TestBed } from '@angular/core/testing';

import { AssestTypeService } from './assest-type.service';

describe('AssestTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssestTypeService = TestBed.get(AssestTypeService);
    expect(service).toBeTruthy();
  });
});

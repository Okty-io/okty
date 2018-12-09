import { TestBed } from '@angular/core/testing';

import { FormControlService } from './form-control.service';

describe('FormControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormControlService = TestBed.get(FormControlService);
    expect(service).toBeTruthy();
  });
});

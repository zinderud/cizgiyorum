import { TestBed, inject } from '@angular/core/testing';

import { AddCizimService } from './add-cizim.service';

describe('AddCizimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddCizimService]
    });
  });

  it('should be created', inject([AddCizimService], (service: AddCizimService) => {
    expect(service).toBeTruthy();
  }));
});

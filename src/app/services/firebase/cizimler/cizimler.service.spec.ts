import { TestBed, inject } from '@angular/core/testing';

import { CizimlerService } from './cizimler.service';

describe('CizimlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CizimlerService]
    });
  });

  it('should ...', inject([CizimlerService], (service: CizimlerService) => {
    expect(service).toBeTruthy();
  }));
});

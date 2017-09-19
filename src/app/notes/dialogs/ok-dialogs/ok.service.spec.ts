import { TestBed, inject } from '@angular/core/testing';

import { OkService } from './ok.service';

describe('OkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OkService]
    });
  });

  it('should be created', inject([OkService], (service: OkService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { FirebaseAccessService } from './firebase-access.service';

describe('FirebaseAccessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseAccessService]
    });
  });

  it('should be created', inject([FirebaseAccessService], (service: FirebaseAccessService) => {
    expect(service).toBeTruthy();
  }));
});

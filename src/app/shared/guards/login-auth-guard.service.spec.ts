import { TestBed, inject } from '@angular/core/testing';

import { LoginAuthGuardService } from './login-auth-guard.service';

describe('LoginAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginAuthGuardService]
    });
  });

  it('should be created', inject([LoginAuthGuardService], (service: LoginAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});

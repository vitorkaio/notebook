import { TestBed, inject } from '@angular/core/testing';
import { AuxiliarService } from "./auxiliar.service";


describe('AuxiliarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuxiliarService]
    });
  });

  it('should be created', inject([AuxiliarService], (service: AuxiliarService) => {
    expect(service).toBeTruthy();
  }));
});

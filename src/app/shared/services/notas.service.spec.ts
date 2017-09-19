import { TestBed, inject } from '@angular/core/testing';

import { NotasService } from './notas.service';

describe('NotasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotasService]
    });
  });

  it('should be created', inject([NotasService], (service: NotasService) => {
    expect(service).toBeTruthy();
  }));
});

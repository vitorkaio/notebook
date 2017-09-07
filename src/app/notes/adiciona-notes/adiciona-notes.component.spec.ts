import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaNotesComponent } from './adiciona-notes.component';

describe('AdicionaNotesComponent', () => {
  let component: AdicionaNotesComponent;
  let fixture: ComponentFixture<AdicionaNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionaNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionaNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

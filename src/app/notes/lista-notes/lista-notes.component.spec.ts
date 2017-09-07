import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNotesComponent } from './lista-notes.component';

describe('ListaNotesComponent', () => {
  let component: ListaNotesComponent;
  let fixture: ComponentFixture<ListaNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

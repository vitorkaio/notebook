import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogsComponent } from './confirm-dialogs.component';

describe('ConfirmDialogsComponent', () => {
  let component: ConfirmDialogsComponent;
  let fixture: ComponentFixture<ConfirmDialogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDialogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

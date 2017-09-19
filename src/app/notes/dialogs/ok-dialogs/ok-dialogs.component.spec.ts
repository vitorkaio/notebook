import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OkDialogsComponent } from './ok-dialogs.component';

describe('OkDialogsComponent', () => {
  let component: OkDialogsComponent;
  let fixture: ComponentFixture<OkDialogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OkDialogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OkDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

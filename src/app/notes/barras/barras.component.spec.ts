import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrasComponent } from './barras.component';

describe('BarrasComponent', () => {
  let component: BarrasComponent;
  let fixture: ComponentFixture<BarrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

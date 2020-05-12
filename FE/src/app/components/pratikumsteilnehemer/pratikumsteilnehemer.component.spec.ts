import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PratikumsteilnehemerComponent } from './pratikumsteilnehemer.component';

describe('PratikumsteilnehemerComponent', () => {
  let component: PratikumsteilnehemerComponent;
  let fixture: ComponentFixture<PratikumsteilnehemerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PratikumsteilnehemerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PratikumsteilnehemerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

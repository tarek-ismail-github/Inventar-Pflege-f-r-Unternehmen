import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssestTypeDialogComponent } from './assest-type-dialog.component';

describe('AssestTypeDialogComponent', () => {
  let component: AssestTypeDialogComponent;
  let fixture: ComponentFixture<AssestTypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssestTypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssestTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

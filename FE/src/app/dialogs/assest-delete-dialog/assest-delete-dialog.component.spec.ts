import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssestDeleteDialogComponent } from './assest-delete-dialog.component';

describe('AssestDeleteDialogComponent', () => {
  let component: AssestDeleteDialogComponent;
  let fixture: ComponentFixture<AssestDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssestDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssestDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

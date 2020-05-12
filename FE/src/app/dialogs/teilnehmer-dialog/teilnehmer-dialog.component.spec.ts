import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeilnehmerDialogComponent } from './teilnehmer-dialog.component';

describe('TeilnehmerDialogComponent', () => {
  let component: TeilnehmerDialogComponent;
  let fixture: ComponentFixture<TeilnehmerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeilnehmerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeilnehmerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

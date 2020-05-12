import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangePortalComponent } from './exchange-portal.component';

describe('ExchangePortalComponent', () => {
  let component: ExchangePortalComponent;
  let fixture: ComponentFixture<ExchangePortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangePortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangePortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

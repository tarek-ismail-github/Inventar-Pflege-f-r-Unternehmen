import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssetTypeComponent } from './create-asset-type.component';

describe('CreateAssetTypeComponent', () => {
  let component: CreateAssetTypeComponent;
  let fixture: ComponentFixture<CreateAssetTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAssetTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssetTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

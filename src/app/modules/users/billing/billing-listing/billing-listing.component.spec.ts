import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingListingComponent } from './billing-listing.component';

describe('BillingListingComponent', () => {
  let component: BillingListingComponent;
  let fixture: ComponentFixture<BillingListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

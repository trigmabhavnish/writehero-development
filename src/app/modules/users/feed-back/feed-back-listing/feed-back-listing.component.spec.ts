import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedBackListingComponent } from './feed-back-listing.component';

describe('FeedBackListingComponent', () => {
  let component: FeedBackListingComponent;
  let fixture: ComponentFixture<FeedBackListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedBackListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedBackListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFeedBackComponent } from './create-feed-back.component';

describe('CreateFeedBackComponent', () => {
  let component: CreateFeedBackComponent;
  let fixture: ComponentFixture<CreateFeedBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFeedBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFeedBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

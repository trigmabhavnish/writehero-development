import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewProjectAdvancedComponent } from './add-new-project-advanced.component';

describe('AddNewProjectAdvancedComponent', () => {
  let component: AddNewProjectAdvancedComponent;
  let fixture: ComponentFixture<AddNewProjectAdvancedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewProjectAdvancedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewProjectAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

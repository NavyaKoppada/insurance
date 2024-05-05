import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomEditButtonComponent } from './custom-edit-button.component';

describe('CustomEditButtonComponent', () => {
  let component: CustomEditButtonComponent;
  let fixture: ComponentFixture<CustomEditButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomEditButtonComponent]
    });
    fixture = TestBed.createComponent(CustomEditButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

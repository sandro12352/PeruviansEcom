import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteGoogleProfileComponent } from './complete-google-profile.component';

describe('CompleteGoogleProfileComponent', () => {
  let component: CompleteGoogleProfileComponent;
  let fixture: ComponentFixture<CompleteGoogleProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteGoogleProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteGoogleProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

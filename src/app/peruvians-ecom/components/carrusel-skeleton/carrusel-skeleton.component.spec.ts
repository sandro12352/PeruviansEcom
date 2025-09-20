import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselSkeletonComponent } from './carrusel-skeleton.component';

describe('CarruselSkeletonComponent', () => {
  let component: CarruselSkeletonComponent;
  let fixture: ComponentFixture<CarruselSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarruselSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarruselSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

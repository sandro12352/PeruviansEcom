import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselMarcasComponent } from './carrusel-marcas.component';

describe('CarruselMarcasComponent', () => {
  let component: CarruselMarcasComponent;
  let fixture: ComponentFixture<CarruselMarcasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarruselMarcasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarruselMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselComentariosComponent } from './carrusel-comentarios.component';

describe('CarruselComentariosComponent', () => {
  let component: CarruselComentariosComponent;
  let fixture: ComponentFixture<CarruselComentariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarruselComentariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarruselComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

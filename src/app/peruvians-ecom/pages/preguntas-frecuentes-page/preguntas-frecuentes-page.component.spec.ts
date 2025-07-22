import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasFrecuentesPageComponent } from './preguntas-frecuentes-page.component';

describe('PreguntasFrecuentesPageComponent', () => {
  let component: PreguntasFrecuentesPageComponent;
  let fixture: ComponentFixture<PreguntasFrecuentesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreguntasFrecuentesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreguntasFrecuentesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

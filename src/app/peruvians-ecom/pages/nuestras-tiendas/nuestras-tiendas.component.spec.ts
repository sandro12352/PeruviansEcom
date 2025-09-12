import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestrasTiendasComponent } from './nuestras-tiendas.component';

describe('NuestrasTiendasComponent', () => {
  let component: NuestrasTiendasComponent;
  let fixture: ComponentFixture<NuestrasTiendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NuestrasTiendasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuestrasTiendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

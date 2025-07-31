import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarPageComponent } from './pagar-page.component';

describe('PagarPageComponent', () => {
  let component: PagarPageComponent;
  let fixture: ComponentFixture<PagarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagarPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

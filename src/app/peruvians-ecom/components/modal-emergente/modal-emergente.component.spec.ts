import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmergenteComponent } from './modal-emergente.component';

describe('ModalEmergenteComponent', () => {
  let component: ModalEmergenteComponent;
  let fixture: ComponentFixture<ModalEmergenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEmergenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEmergenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

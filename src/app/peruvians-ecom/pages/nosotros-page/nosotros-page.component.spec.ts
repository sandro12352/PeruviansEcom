import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosotrosPageComponent } from './nosotros-page.component';

describe('NosotrosPageComponent', () => {
  let component: NosotrosPageComponent;
  let fixture: ComponentFixture<NosotrosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NosotrosPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NosotrosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

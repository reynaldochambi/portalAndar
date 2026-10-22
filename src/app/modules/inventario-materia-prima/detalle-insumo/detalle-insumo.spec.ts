import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleInsumo } from './detalle-insumo';

describe('DetalleInsumo', () => {
  let component: DetalleInsumo;
  let fixture: ComponentFixture<DetalleInsumo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleInsumo],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleInsumo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTallas } from './stock-tallas';

describe('StockTallas', () => {
  let component: StockTallas;
  let fixture: ComponentFixture<StockTallas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockTallas],
    }).compileComponents();

    fixture = TestBed.createComponent(StockTallas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

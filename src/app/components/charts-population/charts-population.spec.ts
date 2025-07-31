import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsPopulation } from './charts-population';

describe('ChartsPopulation', () => {
  let component: ChartsPopulation;
  let fixture: ComponentFixture<ChartsPopulation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsPopulation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsPopulation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

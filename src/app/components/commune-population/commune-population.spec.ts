import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunePopulation } from './commune-population';

describe('CommunePopulation', () => {
  let component: CommunePopulation;
  let fixture: ComponentFixture<CommunePopulation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunePopulation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunePopulation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommuneList } from './commune-list';

describe('CommuneList', () => {
  let component: CommuneList;
  let fixture: ComponentFixture<CommuneList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommuneList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommuneList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

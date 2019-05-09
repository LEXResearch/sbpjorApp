import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaLivrePage } from './mesa-livre.page';

describe('MesaLivrePage', () => {
  let component: MesaLivrePage;
  let fixture: ComponentFixture<MesaLivrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesaLivrePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesaLivrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaCoordenadaPage } from './mesa-coordenada.page';

describe('MesaCoordenadaPage', () => {
  let component: MesaCoordenadaPage;
  let fixture: ComponentFixture<MesaCoordenadaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesaCoordenadaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesaCoordenadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

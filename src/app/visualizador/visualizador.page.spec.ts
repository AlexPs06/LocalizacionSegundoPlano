import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizadorPage } from './visualizador.page';

describe('VisualizadorPage', () => {
  let component: VisualizadorPage;
  let fixture: ComponentFixture<VisualizadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizadorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

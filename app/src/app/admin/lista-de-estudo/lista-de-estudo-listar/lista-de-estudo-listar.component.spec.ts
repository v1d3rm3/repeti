import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeEstudoListarComponent } from './lista-de-estudo-listar.component';

describe('ListaDeEstudoListarComponent', () => {
  let component: ListaDeEstudoListarComponent;
  let fixture: ComponentFixture<ListaDeEstudoListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDeEstudoListarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeEstudoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

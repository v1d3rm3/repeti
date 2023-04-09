import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissaoListarComponent } from './permissao-listar.component';

describe('PermissaoListarComponent', () => {
  let component: PermissaoListarComponent;
  let fixture: ComponentFixture<PermissaoListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissaoListarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissaoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

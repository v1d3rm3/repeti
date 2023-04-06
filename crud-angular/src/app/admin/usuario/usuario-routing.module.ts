import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissaoComponent } from './permissao/permissao.component';
import { UsuarioListarComponent } from './usuario-listar/usuario-listar.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioListarComponent,
  },
  {
    path: ':id/permissao',
    component: PermissaoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}

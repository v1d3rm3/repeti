import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissaoListarComponent } from './permissao-listar/permissao-listar.component';

const routes: Routes = [
  {
    path: '',
    component: PermissaoListarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissaoRoutingModule {}

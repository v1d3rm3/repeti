import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PermissaoAdminGuard } from './permissao-admin.guard';
import { SemAutorizacaoComponent } from './sem-autorizacao/sem-autorizacao.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [PermissaoAdminGuard],
  },
  {
    path: 'lista-de-estudo',
    loadChildren: () =>
      import('./lista-de-estudo/lista-de-estudo.module').then(
        (m) => m.ListaDeEstudoModule
      ),
    canLoad: [PermissaoAdminGuard],
  },
  {
    path: 'prova',
    loadChildren: () =>
      import('./prova/prova.module').then((m) => m.ProvaModule),
    canLoad: [PermissaoAdminGuard],
  },
  {
    path: 'categoria',
    loadChildren: () =>
      import('./categoria/categoria.module').then((m) => m.CategoriaModule),
    canLoad: [PermissaoAdminGuard],
  },
  {
    path: 'usuario',
    loadChildren: () =>
      import('./usuario/usuario.module').then((m) => m.UsuarioModule),
    canLoad: [PermissaoAdminGuard],
  },
  {
    path: 'permissao',
    loadChildren: () =>
      import('./permissao/permissao.module').then((m) => m.PermissaoModule),
    canLoad: [PermissaoAdminGuard],
  },
  {
    path: 'sem-autorizacao',
    component: SemAutorizacaoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

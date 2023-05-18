import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PermissaoUserGuard } from './permissao-user.guard';
import { SemAutorizacaoComponent } from './sem-autorizacao/sem-autorizacao.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [PermissaoUserGuard],
  },
  {
    path: 'lista-de-estudo',
    loadChildren: () =>
      import('./lista-de-estudo/lista-de-estudo.module').then(
        (m) => m.ListaDeEstudoModule
      ),
    canLoad: [PermissaoUserGuard],
  },
  {
    path: 'categoria',
    loadChildren: () =>
      import('./categoria/categoria.module').then((m) => m.CategoriaModule),
    canLoad: [PermissaoUserGuard],
  },
  {
    path: 'questao',
    loadChildren: () =>
      import('./questao/questao.module').then((m) => m.QuestaoModule),
    canLoad: [PermissaoUserGuard],
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
export class UserRoutingModule {}

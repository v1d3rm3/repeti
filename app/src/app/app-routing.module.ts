import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoGuard } from './autenticacao/autenticacao.guard';
import { ListaPermissoesComponent } from './permissoes/lista-permissoes/lista-permissoes.component';


const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: '',
  // },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AutenticacaoGuard]
  },
  {
    path: 'permissoes',
    component: ListaPermissoesComponent,
    canLoad: [AutenticacaoGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

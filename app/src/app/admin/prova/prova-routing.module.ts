import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EditarComponent } from './editar/editar.component';
import { ProvaListarComponent } from './prova-listar/prova-listar.component';

const routes: Routes = [
  {
    path: '',
    component: ProvaListarComponent,
  },
  {
    path: 'cadastrar',
    component: CadastrarComponent,
  },
  {
    path: 'editar/:id',
    component: EditarComponent,
  },
  {
    path: ':id/questao',
    loadChildren: () =>
      import('./questao/questao.module').then((m) => m.QuestaoModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProvaRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarQuestaoComponent } from './cadastrar/cadastrar.component';
import { EditarQuestaoComponent } from './editar/editar.component';
import { QuestaoListarComponent } from './listar/listar.component';

const routes: Routes = [
  {
    path: '',
    component: QuestaoListarComponent,
  },
  {
    path: 'cadastrar',
    component: CadastrarQuestaoComponent,
  },
  {
    path: 'editar/:questao_id',
    component: EditarQuestaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestaoRoutingModule {}

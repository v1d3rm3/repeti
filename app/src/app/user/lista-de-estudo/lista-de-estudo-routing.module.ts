import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDeEstudoListarComponent } from './lista-de-estudo-listar/lista-de-estudo-listar.component';

const routes: Routes = [
  {
    path: '',
    component: ListaDeEstudoListarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaDeEstudoRoutingModule {}

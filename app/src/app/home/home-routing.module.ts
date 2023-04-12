import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { SessaoAtivaGuard } from './sessao-ativa.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'autenticacao/entrar',
    component: LoginComponent,
    canActivate: [SessaoAtivaGuard],
  },
  {
    path: 'autenticacao/cadastro',
    component: CadastroComponent,
    canActivate: [SessaoAtivaGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

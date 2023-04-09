import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';
import { SessaoUsuarioService } from '../../autenticacao/sessao-usuario.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginValido = true;
  email = '';
  senha = '';

  constructor(
    private _loginService: LoginService,
    private _sessaoUsuarioService: SessaoUsuarioService,
    private router: Router
  ) {}

  login() {
    this._loginService.login(this.email, this.senha).subscribe({
      next: (res) => {
        this._sessaoUsuarioService.atualizarSessao(res);
        this.loginValido = true;
        this.router.navigate(['/']);
      },
      error: () => (this.loginValido = false),
    });
  }
}

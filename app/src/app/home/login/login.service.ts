import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { AutenticacaoService } from '../../autenticacao/autenticacao.service';
import { TokenService } from '../../autenticacao/token.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private _autenticacaoService: AutenticacaoService,
    private _tokenService: TokenService
  ) {}

  login(email: string, senha: string) {
    return this._autenticacaoService.autenticar(email, senha).pipe(
      tap((res) => {
        this._tokenService.salvarToken(res.token)
      }),
      switchMap((val) => {
        return this._autenticacaoService.recuperarInfo();
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { IUsuarioAutenticadoInfoResponseDto } from './interfaces';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class SessaoUsuarioService {
  private _sessao: IUsuarioAutenticadoInfoResponseDto | undefined;

  constructor(private _tokenService: TokenService) {}

  atualizarSessao(sessao: IUsuarioAutenticadoInfoResponseDto) {
    this._sessao = sessao;
  }

  recuperarSessao(): IUsuarioAutenticadoInfoResponseDto | undefined {
    return this._sessao;
  }

  estaLogado() {
    return this._sessao ? true : false;
  }

  destruirSessao() {
    this._tokenService.excluirToken();
    this._sessao = undefined;
  }
}

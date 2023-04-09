import { Injectable } from '@angular/core';
import { UsuarioPapel } from './interfaces';
import { SessaoUsuarioService } from './sessao-usuario.service';

@Injectable({ providedIn: 'root' })
export class AutorizacaoService {
  constructor(private _sessaoUsuarioService: SessaoUsuarioService) {}

  /**
   * Verifica se o usuário da sessão atual possui o papel
   * especificado por parâmetro
   *
   * @param papel O papel que se quer verificar
   */
  temPapel(papel: UsuarioPapel) {
    const sessao = this._sessaoUsuarioService.recuperarSessao();
    if (sessao) {
      return sessao.permissoes.filter(v => v.nome === papel).length > 0;
    } else {
      return false;
    }
  }
}

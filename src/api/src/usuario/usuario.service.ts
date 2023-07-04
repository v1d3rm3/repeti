import { Injectable } from '@nestjs/common';
import { UsuarioBuilder } from '../core/models/impl/usuario-builder';
import { UsuarioCadastrarReq } from '../core/models/rest/usuario/usuario-cadastrar-req';
import { UsuarioDao } from '../dal/usuario/usuario-dao';

@Injectable()
export class UsuarioService {
  constructor(private usuarioDao: UsuarioDao) {}

  async cadastrar(params: UsuarioCadastrarReq) {
    let usuario = UsuarioBuilder.create()
      .email(params.email)
      .nome(params.nome)
      .sobrenome(params.sobrenome);

    usuario = await usuario.senhaSemCriptografiaAsync(params.senha);

    return await this.usuarioDao.cadastrar({
      data: usuario.build(),
    });
  }
}

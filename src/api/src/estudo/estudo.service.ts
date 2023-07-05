import { Injectable } from '@nestjs/common';
import { EstudoBuilder } from '../core/models/impl/estudo/estudo-builder';
import { Nivel } from '../core/models/interface/nivel';
import { EstudoCadastrarReq } from '../core/models/rest/estudo/estudo-cadastrar-req';
import { EstudoDao } from '../dal/estudo-dao';
import { UsuarioDao } from '../dal/usuario/usuario-dao';

@Injectable()
export class EstudoService {
  constructor(
    private readonly estudoDao: EstudoDao,
    private readonly usuarioDao: UsuarioDao,
  ) {}

  async cadastrar(estudo: EstudoCadastrarReq, email: string) {
    const usuario = await this.usuarioDao.recuperarPorEmail({ data: email });

    const estudoItem = EstudoBuilder.create()
      .categoriaId(estudo.categoriaId)
      .estudanteId(usuario.id)
      .nivelAtual(Nivel.MuitoFacil)
      .build();

    return await this.estudoDao.criar({ data: estudoItem });
  }
}

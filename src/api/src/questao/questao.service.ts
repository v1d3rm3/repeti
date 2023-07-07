import { Injectable } from '@nestjs/common';
import { QuestaoCriarReq } from '../core/models/rest/questao/questao-criar-req';
import { UsuarioDao } from '../dal/usuario-dao';
import { QuestaoBuilder } from '../core/models/impl/questao/questao-builder';

@Injectable()
export class QuestaoService {
  constructor(private usuarioDao: UsuarioDao) {}

  async criar(params: QuestaoCriarReq, email: string) {
    const usuario = await this.usuarioDao.recuperarPorEmail({ data: email });
    // PONTO FLEXIVEL
    // no caso, o ponto flexível aqui é
    // dar a liberdade do sistema permitir ou
    // não nivel e qualidade serem definidas...
    QuestaoBuilder.create()
      .elaboradorId(usuario.id)
      .categoriaId(params.categoriaId)
      .enunciado(params.enunciado)
      .nivel(params.nivel)
      .qualidade(params.qualidade)
      .build();

    // return await this.usuarioDao.cadastrar({
    //   data: usuario.build(),
    // });
  }
}

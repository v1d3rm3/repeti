import { Injectable, Logger } from '@nestjs/common';
import { QuestaoCriarReq } from '../core/models/rest/questao/questao-criar-req';
import { UsuarioDao } from '../dal/usuario-dao';
import { QuestaoBuilder } from '../core/models/impl/questao/questao-builder';
import { QuestaoDao } from '../dal/questao-dao';
import { CategoriaStore } from '../categoria-store';

@Injectable()
export class QuestaoService {
  constructor(
    private usuarioDao: UsuarioDao,
    private questaoDao: QuestaoDao,
    private categoriaStore: CategoriaStore,
  ) {}

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

  async proximaQuestao(categoriaId: number) {
    const questoes = await this.questaoDao.recuperarPorCategoriaSomenteId({
      data: this.categoriaStore
        .recuperarTodasAsSubcategorias(categoriaId)
        ?.filter((c) => c && c.id)
        ?.map((c) => c?.id),
    });

    // POSSIVEL PONTO FLEXIVEL
    // aleatoriamente seleciona uma questao
    const questaoSelecionada =
      questoes[Math.floor(Math.random() * questoes.length)];

    return await this.questaoDao.recuperarPorId({
      data: questaoSelecionada.id,
    });
  }
}

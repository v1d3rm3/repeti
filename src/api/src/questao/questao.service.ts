import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriaStore } from '../categoria-store';
import { ContadorReavaliacaoQuestao } from '../contador-reavaliacao-questao';
import { AlternativaNaoFazParteDeQuestaoException } from '../core/exceptions/alternativa-nao-faz-parte-de-questao.exception';
import { EntidadeNaoExisteException } from '../core/exceptions/entidade-nao-existe.exception';
import { QuestaoJaFoiAvaliadaException } from '../core/exceptions/questao-ja-foi-avaliada.exception';
import { QuestaoImpl } from '../core/models/impl/questao/questao';
import { QuestaoBuilder } from '../core/models/impl/questao/questao-builder';
import { QuestaoEstudadaImpl } from '../core/models/impl/questao/questao-estudada';
import { QuestaoEstudadaBuilder } from '../core/models/impl/questao/questao-estudada-builder';
import { Nivel } from '../core/models/interface/nivel';
import { Qualidade } from '../core/models/interface/qualidade';
import { QuestaoCriarReq } from '../core/models/rest/questao/questao-criar-req';
import { MysqlService } from '../core/mysql/mysql.service';
import { EstudoDao } from '../dal/estudo-dao';
import { QuestaoDao } from '../dal/questao-dao';
import { QuestaoEstudadaDao } from '../dal/questao-estudada-dao';
import { UsuarioDao } from '../dal/usuario-dao';

@Injectable()
export class QuestaoService {
  constructor(
    private readonly usuarioDao: UsuarioDao,
    private readonly questaoDao: QuestaoDao,
    private readonly categoriaStore: CategoriaStore,
    private readonly estudoDao: EstudoDao,
    private readonly questaoEstudadaDao: QuestaoEstudadaDao,
    private readonly contadorReavaliacaoQuestao: ContadorReavaliacaoQuestao,
    private readonly mysqlService: MysqlService,
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

  async resolverQuestao(
    questaoId: number,
    alternativaId: number,
    email: string,
  ) {
    const [usuario, questao, alternativas] = await Promise.all([
      this.usuarioDao.recuperarPorEmail({ data: email }),
      this.questaoDao.recuperarPorId({ data: questaoId }),
      this.questaoDao.recuperarAlternativasPorQuestaoId({ data: questaoId }),
    ]);

    if (!questao) {
      throw new EntidadeNaoExisteException(
        QuestaoImpl.name,
        questaoId.toString(),
      );
    }

    if (!alternativas.map((a) => a.id).includes(alternativaId)) {
      throw new AlternativaNaoFazParteDeQuestaoException(
        alternativaId.toString(),
      );
    }

    const alternativaCorreta = alternativas.find((a) => a.resposta);

    const acertou = alternativaCorreta?.id === alternativaId;

    const questaoEstudada = QuestaoEstudadaBuilder.create()
      .estudanteId(usuario.id)
      .alternativaId(alternativaId)
      .acertou(acertou)
      .build();

    // criar questao estudada
    return await this.questaoEstudadaDao.criar({ data: questaoEstudada });
  }

  async avaliarQuestao(
    questaoEstudadaId: number,
    nivel: Nivel,
    qualidade: Qualidade,
    email: string,
  ) {
    const [usuario, questaoEstudada] = await Promise.all([
      this.usuarioDao.recuperarPorEmail({ data: email }),
      this.questaoEstudadaDao.recuperarPorId({ data: questaoEstudadaId }),
    ]);

    const questao = await this.questaoDao.recuperarPorId({
      data: questaoEstudada.alternativa?.questaoId,
    });

    if (!questaoEstudada) {
      throw new EntidadeNaoExisteException(
        QuestaoEstudadaImpl.name,
        questaoEstudadaId.toString(),
      );
    }

    if (usuario.id !== questaoEstudada.estudanteId) {
      throw new BadRequestException('Não foi você quem fez essa questão');
    }

    if (questaoEstudada.nivel || questaoEstudada.qualidade)
      throw new QuestaoJaFoiAvaliadaException(
        questaoEstudadaId.toString() + ', questão já foi avaliada',
      );

    questaoEstudada.nivel = nivel;
    questaoEstudada.qualidade = qualidade;

    const precisaReavaliar = this.contadorReavaliacaoQuestao.precisaReavaliar(
      questaoEstudada.alternativa?.questaoId,
    );
    // reavaliar questao??
    if (precisaReavaliar) {
      const [nivel, qualidade] =
        await this.contadorReavaliacaoQuestao.reavaliarQuestao(questao);
      questao.nivel = nivel as Nivel;
      questao.qualidade = qualidade as Qualidade;
    }

    const pool = await this.mysqlService.getConnection();

    try {
      pool.query('START TRANSACTION;');
      const res = await this.questaoEstudadaDao.atualizarNivelEQualidade({
        data: questaoEstudada,
        tx: pool,
      });

      if (precisaReavaliar)
        await this.questaoDao.atualizarNivelEQualidade({
          data: questao,
          tx: pool,
        });

      pool.query('COMMIT;');
      return res;
    } catch (e) {
      pool.query('ROLLBACK;');
      throw e;
    }
  }
}

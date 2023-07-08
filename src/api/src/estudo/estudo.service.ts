import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriaStore } from '../categoria-store';
import { AlternativaNaoFazParteDeQuestaoException } from '../core/exceptions/alternativa-nao-faz-parte-de-questao.exception';
import { EntidadeNaoExisteException } from '../core/exceptions/entidade-nao-existe.exception';
import { QuestaoJaFoiAvaliadaException } from '../core/exceptions/questao-ja-foi-avaliada.exception';
import { QuestaoJaFoiRespondidaException } from '../core/exceptions/questao-ja-foi-respondida.exception';
import { TodasAsQuestoesForamEstudadasException } from '../core/exceptions/todas-as-questoes-foram-estudadas.exception';
import { EstudoImpl } from '../core/models/impl/estudo/estudo';
import { EstudoBuilder } from '../core/models/impl/estudo/estudo-builder';
import { QuestaoImpl } from '../core/models/impl/questao/questao';
import { QuestaoEstudadaImpl } from '../core/models/impl/questao/questao-estudada';
import { QuestaoEstudadaBuilder } from '../core/models/impl/questao/questao-estudada-builder';
import { Nivel } from '../core/models/interface/nivel';
import { Qualidade } from '../core/models/interface/qualidade';
import { EstudoCadastrarReq } from '../core/models/rest/estudo/estudo-cadastrar-req';
import { MysqlService } from '../core/mysql/mysql.service';
import { EstudoDao } from '../dal/estudo-dao';
import { QuestaoDao } from '../dal/questao-dao';
import { QuestaoEstudadaDao } from '../dal/questao-estudada-dao';
import { UsuarioDao } from '../dal/usuario-dao';
import { ProximaQuestaoTemplateMethod } from './framework/proxima-questao-template-method';

@Injectable()
export class EstudoService {
  constructor(
    private readonly estudoDao: EstudoDao,
    private readonly usuarioDao: UsuarioDao,
    private readonly proximaQuestaoTemplateMethod: ProximaQuestaoTemplateMethod,
    private readonly questaoDao: QuestaoDao,
    private readonly questaoEstudadaDao: QuestaoEstudadaDao,
    private readonly categoriaStore: CategoriaStore,
    private readonly mysqlService: MysqlService,
  ) {}

  async recuperarPorId(estudoId: number, email: string) {
    const usuario = await this.usuarioDao.recuperarPorEmail({ data: email });
    const estudo = await this.estudoDao.recuperarPorId({ data: estudoId });

    if (!estudo) {
      throw new EntidadeNaoExisteException(
        EstudoImpl.name,
        'Estudo não encontrado',
      );
    }

    if (estudo.estudanteId !== usuario.id) {
      throw new BadRequestException('Estudo não encontrado');
    }

    return estudo;
  }

  async cadastrar(estudo: EstudoCadastrarReq, email: string) {
    const usuario = await this.usuarioDao.recuperarPorEmail({ data: email });

    if (
      await this.estudoDao.recuperarAtivaPorCategoriaId({
        data: { categoriaId: estudo.categoriaId, estudanteId: usuario.id },
      })
    ) {
      throw new BadRequestException(
        'Já existe um estudo cadastrado para essa categoria',
      );
    }
    const estudoItem = EstudoBuilder.create()
      .categoriaId(estudo.categoriaId)
      .estudanteId(usuario.id)
      .nivelAtual(Nivel.MuitoFacil)
      .build();

    return await this.estudoDao.criar({ data: estudoItem });
  }

  async proximaQuestao(estudoId: number, email: string) {
    const usuario = await this.usuarioDao.recuperarPorEmail({ data: email });
    const estudo = await this.estudoDao.recuperarPorId({ data: estudoId });

    if (!estudo) {
      throw new BadRequestException('Estudo não existe');
    }

    if (estudo.estudante.id !== usuario.id) {
      throw new BadRequestException('Você não é dono deste estudo');
    }

    try {
      return await this.proximaQuestaoTemplateMethod.proximaQuestao(estudo);
    } catch (e) {
      if (e instanceof TodasAsQuestoesForamEstudadasException) {
        // DO SOMETHING
        console.log('DO SOMETHING');
      }
      throw e;
    }
  }

  async resolverQuestao(
    estudoId: number,
    questaoId: number,
    alternativaId: number,
    username: any,
  ) {
    const [usuario, estudo, questao, alternativas] = await Promise.all([
      this.usuarioDao.recuperarPorEmail({ data: username }),
      this.estudoDao.recuperarPorId({ data: estudoId }),
      this.questaoDao.recuperarPorId({ data: questaoId }),
      this.questaoDao.recuperarAlternativasPorQuestaoId({ data: questaoId }),
    ]);

    if (!estudo) {
      throw new EntidadeNaoExisteException(
        EstudoImpl.name,
        estudoId.toString(),
      );
    }

    if (estudo.estudante.id !== usuario.id) {
      throw new BadRequestException('Você não é dono deste estudo');
    }

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

    // verificando se a questao ja foi respondida
    // dentro de um estudo
    const questaoEstudadaFoiEncontrada =
      await this.estudoDao.recuperarQuestaoEstudadaPorQuestaoId({
        data: {
          estudoId,
          questaoId,
        },
      });

    if (questaoEstudadaFoiEncontrada)
      throw new QuestaoJaFoiRespondidaException(questaoId.toString());

    // verificando se a resposta esta correta
    const alternativaCorreta = alternativas.find((a) => a.resposta);

    const questaoEstudada = QuestaoEstudadaBuilder.create()
      .estudanteId(usuario.id)
      .estudoId(estudo.id)
      .alternativaId(alternativaId)
      .acertou(alternativaCorreta?.id === alternativaId)
      .build();

    return await this.estudoDao.criarQuestaoEstudadaEmEstudo({
      data: questaoEstudada,
    });
  }

  async listar(email: string) {
    const usuario = await this.usuarioDao.recuperarPorEmail({ data: email });
    return await this.estudoDao.listar({ data: usuario.id });
  }

  async avaliarQuestao(
    questaoEstudadaId: number,
    nivel: Nivel,
    qualidade: Qualidade,
    username: any,
  ) {
    const usuario = await this.usuarioDao.recuperarPorEmail({ data: username });
    const questaoEstudada = await this.questaoEstudadaDao.recuperarPorId({
      data: questaoEstudadaId,
    });

    if (!questaoEstudada) {
      throw new EntidadeNaoExisteException(
        QuestaoEstudadaImpl.name,
        questaoEstudadaId.toString() + ', questão ainda não foi respondida',
      );
    }

    if (questaoEstudada.estudante.id !== usuario.id) {
      throw new BadRequestException('Não foi você quem estudou esta questão');
    }

    if (questaoEstudada.nivel || questaoEstudada.qualidade)
      throw new QuestaoJaFoiAvaliadaException(
        questaoEstudadaId.toString() + ', questão já foi avaliada',
      );

    // atualizar questao estudada
    questaoEstudada.nivel = nivel;
    questaoEstudada.qualidade = qualidade;

    const pool = await this.mysqlService.getConnection();

    try {
      pool.query('START TRANSACTION;');
      const res = await this.questaoEstudadaDao.atualizarNivelEQualidade({
        data: questaoEstudada,
        tx: pool,
      });
      pool.query('COMMIT;');
      return res;
    } catch (e) {
      pool.query('ROLLBACK;');
      throw e;
    }
  }

  async desativar(estudoId: number, email: string) {
    const usuario = await this.usuarioDao.recuperarPorEmail({ data: email });
    const estudo = await this.estudoDao.recuperarPorId({ data: estudoId });

    if (!estudo) {
      throw new EntidadeNaoExisteException(
        EstudoImpl.name,
        estudoId.toString(),
      );
    }

    if (estudo.estudante.id !== usuario.id) {
      throw new BadRequestException('Você não é dono deste estudo');
    }

    const pool = await this.mysqlService.getConnection();

    try {
      pool.query('START TRANSACTION;');
      await this.estudoDao.desativar({ data: estudoId });
      pool.query('COMMIT;');
    } catch (e) {
      pool.query('ROLLBACK;');
      throw e;
    }
  }
}

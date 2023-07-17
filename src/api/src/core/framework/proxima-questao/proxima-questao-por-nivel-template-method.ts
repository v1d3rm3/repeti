import { Injectable, Logger } from '@nestjs/common';
import { CategoriaStore } from '../../../categoria-store';
import { EstudoDao } from '../../../dal/estudo-dao';
import { QuestaoDao } from '../../../dal/questao-dao';
import { QuestaoEstudadaDao } from '../../../dal/questao-estudada-dao';
import { TodasAsQuestoesForamEstudadasException } from '../../exceptions/todas-as-questoes-foram-estudadas.exception';
import { IEstudo } from '../../models/interface/estudo';
import { NivelOrdem, OrdemNivel } from '../../models/interface/nivel';
import { IQuestao } from '../../models/interface/questao';
import { ProximaQuestaoTemplateMethod } from './proxima-questao-template-method';

/**
 * Seleciona as próximas questões de maneira aleatória
 * dentro de um nível específico.
 */
@Injectable()
export class ProximaQuestaoPorNivelTemplateMethod extends ProximaQuestaoTemplateMethod {
  private logger = new Logger(ProximaQuestaoTemplateMethod.name);

  constructor(
    private readonly questaoDao: QuestaoDao,
    private readonly estudoDao: EstudoDao,
    private readonly questaoEstudadaDao: QuestaoEstudadaDao,
    private readonly categoriaStore: CategoriaStore,
  ) {
    super();
    this.logger.verbose(
      'ProximaQuestaoPorNivelTemplateMethod foi escolhida ' +
        'como implementação de ProximaQuestaoTemplateMethod',
    );
  }

  /**
   * Recupera todas as questões que ainda não foram estudadas
   * pelo usuário, nesse estudo.
   *
   * Todas as questões da categoria do estudo e suas subcategorias
   * são consideradas para a seleção.
   * @param estudo
   * @returns
   */
  async recuperarConjuntoDeQuestoes(estudo: IEstudo) {
    // 0. recupera a categoria e todas as suas subcategorias
    const categorias = this.categoriaStore
      .recuperarTodasAsSubcategorias(estudo.categoria.id)
      ?.filter((c) => c && c.id)
      ?.map((c) => c?.id);

    // 1. selecionar todas as questoes que foram feitas
    // pelo usuario, nesse estudo
    const qe = await this.questaoEstudadaDao.recuperarSomenteIdPorEstudo({
      data: estudo.id,
    });

    // 2. selecionar todos os ids das possiveis questoes
    // filtrando por nivel
    // 3. fazer a diferenca entre esses dois conjuntos
    return this._procuraConjuntoDeQuestoesEmNiveis(qe, estudo, categorias);
  }

  private async _procuraConjuntoDeQuestoesEmNiveis(
    qe: { id: number }[],
    estudo: IEstudo,
    categorias: number[],
  ) {
    // 2. selecionar todos os ids das possiveis questoes
    // filtrando por nivel
    const q = await this.questaoDao.recuperarPorCategoriaENivelSomenteId({
      data: {
        nivel: estudo.nivelAtual,
        categoriasIds: categorias,
      },
    });

    // 3. fazer a diferenca entre esses dois conjuntos
    const diff = this._extrairQuestoesNaoEstudadas(qe, q);

    if (diff?.length === 0) {
      // 1. seta o nivel atual para o proximo nivel
      const proximoNivel = NivelOrdem.get(estudo.nivelAtual) + 1;

      if (proximoNivel > NivelOrdem.size)
        throw new TodasAsQuestoesForamEstudadasException();

      estudo.nivelAtual = OrdemNivel.get(proximoNivel);

      await this.estudoDao.atualizarNivelAtual({
        data: estudo,
      });

      // 2. refaz o passo 2
      return await this._procuraConjuntoDeQuestoesEmNiveis(
        qe,
        estudo,
        categorias,
      );
    } else {
      return diff;
    }
  }

  async selecionarQuestao(
    conjuntoDeQuestoes: Pick<IQuestao, 'id'>[],
  ): Promise<IQuestao> {
    if (conjuntoDeQuestoes?.length === 0)
      throw new TodasAsQuestoesForamEstudadasException();

    const questoesDisponiveis = await this.questaoDao.recuperarPorIds({
      data: conjuntoDeQuestoes.map((e) => e.id),
    });

    // maneira aleatoria
    const questao = this._obterItemAleatorio(questoesDisponiveis);

    questao.alternativas =
      await this.questaoDao.recuperarAlternativasPorQuestaoId({
        data: questao.id,
      });

    return questao;
  }

  private _obterItemAleatorio<T>(array: T[]): T | undefined {
    if (array.length === 0) {
      return undefined;
    }

    const indiceAleatorio = Math.floor(Math.random() * array.length);
    return array[indiceAleatorio];
  }
}

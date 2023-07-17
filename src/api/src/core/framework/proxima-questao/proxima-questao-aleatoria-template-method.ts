import { Injectable, Logger } from '@nestjs/common';
import { CategoriaStore } from '../../../categoria-store';
import { QuestaoDao } from '../../../dal/questao-dao';
import { QuestaoEstudadaDao } from '../../../dal/questao-estudada-dao';
import { TodasAsQuestoesForamEstudadasException } from '../../exceptions/todas-as-questoes-foram-estudadas.exception';
import { IEstudo } from '../../models/interface/estudo';
import { IQuestao } from '../../models/interface/questao';
import { ProximaQuestaoTemplateMethod } from './proxima-questao-template-method';

/**
 * Seleciona as próximas questões de maneira aleatória,
 * sem se preocupar com nenhum tipo de filtro específico.
 */
@Injectable()
export class ProximaQuestaoAleatoriaTemplateMethod extends ProximaQuestaoTemplateMethod {
  private logger = new Logger(ProximaQuestaoTemplateMethod.name);

  constructor(
    private readonly questaoDao: QuestaoDao,
    private readonly questaoEstudadaDao: QuestaoEstudadaDao,
    private readonly categoriaStore: CategoriaStore,
  ) {
    super();
    this.logger.verbose(
      'ProximaQuestaoAleatoriaTemplateMethod foi escolhida ' +
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

    // 1. selecionar todos os ids das possiveis questoes
    const q = await this.questaoDao.recuperarPorCategoriaSomenteId({
      data: categorias,
    });

    // 2. selecionar todas as questoes que foram feitas
    // pelo usuario, nesse estudo
    const qe = await this.questaoEstudadaDao.recuperarSomenteIdPorEstudo({
      data: estudo.id,
    });

    // 3. fazer a diferenca entre esses dois conjuntos
    return this._extrairQuestoesNaoEstudadas(qe, q);
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

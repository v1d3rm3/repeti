import { Injectable } from '@nestjs/common';
import { TodasAsQuestoesForamEstudadasException } from '../../core/exceptions/todas-as-questoes-foram-estudadas.exception';
import { IEstudo } from '../../core/models/interface/estudo';
import { IQuestao } from '../../core/models/interface/questao';
import { QuestaoDao } from '../../dal/questao-dao';
import { QuestaoEstudadaDao } from '../../dal/questao-estudada-dao';
import { ProximaQuestaoTemplateMethod } from './proxima-questao-template-method';

/**
 * Seleciona as próximas questões de maneira aleatória,
 * sem se preocupar com nenhum tipo de filtro específico.
 *
 * TODO: Precisa de locks nas leituras....
 */
@Injectable()
export class ProximaQuestaoAleatoriaTemplateMethod extends ProximaQuestaoTemplateMethod {
  constructor(
    private readonly questaoDao: QuestaoDao,
    private readonly questaoEstudadaDao: QuestaoEstudadaDao,
  ) {
    super();
  }

  // TODO: COMUM, ISSO PODE IR FORA...
  async recuperarConjuntoDeQuestoes(estudo: IEstudo) {
    // 1. selecionar todos os ids das possiveis questoes
    // TODO: NA VERDADE, É SELECIONAR POR CATEGORIAS
    const q = await this.questaoDao.recuperarPorCategoriaSomenteId({
      data: estudo.categoria.id,
    });

    // 2. selecionar todas as questoes que foram feitas
    // pelo usuario, nesse estudo
    const qe = await this.questaoEstudadaDao.recuperarSomenteIdPorEstudo({
      data: estudo.id,
    });

    // 3. fazer a diferenca entre esses dois conjuntos
    return q.filter((q1) => !qe.includes(q1));
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

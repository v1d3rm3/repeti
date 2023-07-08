import { Injectable } from '@nestjs/common';
import { IEstudo } from '../../core/models/interface/estudo';
import { IQuestao } from '../../core/models/interface/questao';

type IQuestaoSomenteId = Pick<IQuestao, 'id'>;

@Injectable()
export abstract class ProximaQuestaoTemplateMethod {
  async proximaQuestao(estudo: IEstudo) {
    const conjuntoDeQuestoes = await this.recuperarConjuntoDeQuestoes(estudo);
    return await this.selecionarQuestao(conjuntoDeQuestoes);
  }

  protected abstract recuperarConjuntoDeQuestoes(
    estudo: IEstudo,
  ): Promise<IQuestaoSomenteId[]>;

  protected abstract selecionarQuestao(
    conjuntoDeQuestoes: IQuestaoSomenteId[],
  ): Promise<IQuestao>;

  /**
   * Realiza a extração das questões que ainda não foram estudadas
   * dentro de um estudo, isto é, as questões disponíveis para estudo
   * menos as questões que já foram estudadas.
   *
   * @param questoesEstudadas questoes estudadas
   * @param questoesDisponiveis questoes disponiveis para estudo
   * @returns
   */
  protected _extrairQuestoesNaoEstudadas(
    questoesEstudadas: IQuestaoSomenteId[],
    questoesDisponiveis: IQuestaoSomenteId[],
  ) {
    return questoesDisponiveis
      .map((q) => q.id)
      .filter((q) => !questoesEstudadas.map((q) => q.id).includes(q))
      .map((qid) => {
        return { id: qid };
      });
  }
}

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
}

import { Injectable } from '@nestjs/common';
import { IEstudo } from '../../core/models/interface/estudo';
import { IQuestao } from '../../core/models/interface/questao';

@Injectable()
export abstract class ProximaQuestaoTemplateMethod {
  abstract proximaQuestao(estudo: IEstudo);
  abstract recuperarConjuntoDeQuestoes(estudo: IEstudo): IQuestao[];
  abstract selecionarQuestao(conjuntoDeQuestoes: IQuestao[]);
}

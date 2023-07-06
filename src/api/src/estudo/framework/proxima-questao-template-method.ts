import { IEstudo } from '../../core/models/interface/estudo';
import { IQuestao } from '../../core/models/interface/questao';

export abstract class ProximaQuestaoTemplateMethod {
  abstract proximaQuestao(estudo: IEstudo);
  abstract recuperarConjuntoDeQuestoes(): IQuestao[];
  abstract selecionarQuestao(conjuntoDeQuestoes: IQuestao[]);
}

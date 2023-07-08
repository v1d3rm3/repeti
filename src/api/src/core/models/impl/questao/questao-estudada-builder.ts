import { Nivel } from '../../interface/nivel';
import { Qualidade } from '../../interface/qualidade';
import { IQuestaoEstudada } from '../../interface/questao-estudada';
import { QuestaoEstudadaImpl } from './questao-estudada';

export class QuestaoEstudadaBuilder {
  private _questaoEstudada: IQuestaoEstudada;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static create() {
    const builder = new QuestaoEstudadaBuilder();
    builder._questaoEstudada = new QuestaoEstudadaImpl();
    return builder;
  }

  id(id: number) {
    this._questaoEstudada.id = id;
    return this;
  }

  nivel(nivel: Nivel) {
    this._questaoEstudada.nivel = nivel;
    return this;
  }

  qualidade(qualidade: Qualidade) {
    this._questaoEstudada.qualidade = qualidade;
    return this;
  }

  alternativaId(alternativaId: number) {
    this._questaoEstudada.alternativaId = alternativaId;
    return this;
  }

  estudanteId(estudanteId: number) {
    this._questaoEstudada.estudanteId = estudanteId;
    return this;
  }

  estudoId(estudoId: number) {
    this._questaoEstudada.estudoId = estudoId;
    return this;
  }

  acertou(acertou: boolean) {
    this._questaoEstudada.acertou = acertou;
    return this;
  }

  build() {
    return this._questaoEstudada;
  }
}

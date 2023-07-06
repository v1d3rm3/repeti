import { IAlternativa } from '../../interface/alternativa';
import { Nivel } from '../../interface/nivel';
import { Qualidade } from '../../interface/qualidade';
import { IQuestao } from '../../interface/questao';
import { QuestaoImpl } from './questao';

export class QuestaoBuilder {
  private _questao: IQuestao;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static create() {
    const builder = new QuestaoBuilder();
    builder._questao = new QuestaoImpl();
    return builder;
  }

  id(id: number) {
    this._questao.id = id;
    return this;
  }

  categoriaId(categoriaId: number) {
    this._questao.categoriaId = categoriaId;
    return this;
  }

  elaboradorId(elaboradorId: number) {
    this._questao.elaboradorId = elaboradorId;
    return this;
  }

  enunciado(enunciado: string) {
    this._questao.enunciado = enunciado;
    return this;
  }

  nivel(nivel: Nivel) {
    this._questao.nivel = nivel;
    return this;
  }

  qualidade(qualidade: Qualidade) {
    this._questao.qualidade = qualidade;
    return this;
  }

  alternativas(alternativas: IAlternativa[]) {
    this._questao.alternativas = alternativas;
    return this;
  }

  build() {
    return this._questao;
  }
}

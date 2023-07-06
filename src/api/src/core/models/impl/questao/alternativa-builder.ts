import { IAlternativa } from '../../interface/alternativa';
import { AlternativaImpl } from './alternativa';

export class AlternativaBuilder {
  private _alternativa: IAlternativa;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static create() {
    const builder = new AlternativaBuilder();
    builder._alternativa = new AlternativaImpl();
    return builder;
  }

  id(id: number) {
    this._alternativa.id = id;
    return this;
  }

  descricao(descricao: string) {
    this._alternativa.descricao = descricao;
    return this;
  }

  questaoId(questaoId: number) {
    this._alternativa.questaoId = questaoId;
    return this;
  }

  resposta(resposta: boolean) {
    this._alternativa.resposta = resposta;
    return this;
  }

  build() {
    return this._alternativa;
  }
}

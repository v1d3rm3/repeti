import { IEstudo } from '../../interface/estudo';
import { Nivel } from '../../interface/nivel';
import { EstudoImpl } from './estudo';

export class EstudoBuilder {
  private _estudo: IEstudo;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static create() {
    const builder = new EstudoBuilder();
    builder._estudo = new EstudoImpl();
    return builder;
  }

  id(id: number) {
    this._estudo.id = id;
    return this;
  }

  categoriaId(categoriaId: number) {
    this._estudo.categoriaId = categoriaId;
    return this;
  }

  estudanteId(estudanteId: number) {
    this._estudo.estudanteId = estudanteId;
    return this;
  }

  nivelAtual(nivelAtual: Nivel) {
    this._estudo.nivelAtual = nivelAtual;
    return this;
  }

  desativado(desativado: Date) {
    this._estudo.desativado = desativado;
    return this;
  }

  build() {
    return this._estudo;
  }
}

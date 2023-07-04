import { IEstudo } from '../../interface/estudo';
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

  build() {
    return this._estudo;
  }
}

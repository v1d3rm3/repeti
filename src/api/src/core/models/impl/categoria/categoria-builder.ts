import { ICategoria } from '../../interface/categoria';
import { CategoriaImpl } from './categoria';

export class CategoriaBuilder {
  private _categoria: ICategoria;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static create(): CategoriaBuilder {
    const builder = new CategoriaBuilder();
    builder._categoria = new CategoriaImpl();
    return builder;
  }

  public id(id: number): CategoriaBuilder {
    this._categoria.id = id;
    return this;
  }

  public nome(nome: string): CategoriaBuilder {
    this._categoria.nome = nome;
    return this;
  }

  public categoriaPaiId(categoriaPaiId: number): CategoriaBuilder {
    this._categoria.categoriaPaiId = categoriaPaiId;
    return this;
  }

  public build(): ICategoria {
    return this._categoria;
  }
}

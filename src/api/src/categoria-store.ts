import { Provider } from '@nestjs/common';
import { ICategoria } from './core/models/interface/categoria';
import { CategoriaDao } from './dal/categoria-dao';

export function CategoriaStoreProvider(): Provider {
  return {
    provide: CategoriaStore,
    useFactory: async (categoriaDao: CategoriaDao) => {
      const categorias = await categoriaDao.recuperarTodas();
      const versao = await categoriaDao.recuperarVersaoCache();
      return new CategoriaStore(categorias, versao);
    },
    inject: [CategoriaDao],
  };
}

export class CategoriaStore {
  private readonly _todosOsFilhos: Map<number, ICategoria[]>;

  constructor(categorias: ICategoria[], private _versao: number) {
    this._todosOsFilhos = this._transformarArrayEmMapa(categorias);
  }

  /**
   * Considerando que é possível ter várias
   * categorias aninhadas, passa-se um id de
   * uma categoria, e retorna-se a própria categoria
   * e todas as categorias filhas.
   */
  recuperarTodasAsSubcategorias(categoriaId: number) {
    // IDENTIFICA PROBLEMA AQUI
    console.log(this._todosOsFilhos);
    
    return this._todosOsFilhos.get(categoriaId);
  }

  atualizarVersao(novaVersao: number) {
    this._versao = novaVersao;
  }

  versaoIgual(versao: number) {
    return this._versao === versao;
  }

  private _transformarArrayEmMapa<
    T extends { id: number; categoriaPaiId: number },
  >(array: T[]): Map<number, T[]> {
    const mapa = new Map<number, T[]>();

    for (const objeto of array) {
      const paiId = objeto.categoriaPaiId;
      if (mapa.has(paiId)) {
        mapa.get(paiId)?.push(objeto);
      } else {
        mapa.set(paiId, [objeto]);
      }
    }

    return mapa;
  }
}

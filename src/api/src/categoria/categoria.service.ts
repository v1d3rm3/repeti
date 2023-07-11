import { Injectable } from '@nestjs/common';
import { CategoriaStore } from '../categoria-store';
import { CategoriaDao } from '../dal/categoria-dao';

@Injectable()
export class CategoriaService {
  constructor(
    private categoriaDao: CategoriaDao,
    private readonly categoriaStore: CategoriaStore,
  ) {}

  async recuperar(nome: string) {
    // return await this.categoriaDao.recuperarPorNome(nome);
    return this.categoriaStore.recuperarTodasAsCategorias();
  }

  async recuperarPorNomeFiltroDezPrimeiros(filtro: string) {
    return await this.categoriaDao.recuperarPorNomeFiltroDezPrimeiros(filtro);
  }
}

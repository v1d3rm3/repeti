import { Injectable } from '@nestjs/common';
import { CategoriaDao } from '../dal/categoria-dao';

@Injectable()
export class CategoriaService {
  constructor(private categoriaDao: CategoriaDao) {}

  async recuperar() {
    return await this.categoriaDao.recuperarPorNome('');
  }
}

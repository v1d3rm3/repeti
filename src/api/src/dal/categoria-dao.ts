import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CategoriaImpl } from '../core/models/impl/categoria/categoria';
import { MysqlService } from '../core/mysql/mysql.service';
import { ResultQuery } from '../core/result-query';
import { CategoriaVersaoCache } from '@prisma/client';

@Injectable()
export class CategoriaDao {
  constructor(private readonly mysqlService: MysqlService) {}

  async recuperarPorNome(nome: string) {
    const res = await this.mysqlService.query(
      'call categoria_recuperarPorNome(?);',
      [nome],
    );

    ResultQuery.create(res).normalizeResult();
    return plainToInstance(CategoriaImpl, res);
  }

  async recuperarVersaoCache() {
    const [res] = await this.mysqlService.query<CategoriaVersaoCache>(
      'call CategoriaVersaoCache_recuperar();',
      [],
    );

    ResultQuery.create(res).normalizeResult();
    return res.versao;
  }

  async recuperarTodas() {
    const res = await this.mysqlService.query(
      'call Categoria_recuperarTodas();',
      [],
    );

    ResultQuery.create(res).normalizeResult();
    return res.map((e) => plainToInstance(CategoriaImpl, e));
  }
}

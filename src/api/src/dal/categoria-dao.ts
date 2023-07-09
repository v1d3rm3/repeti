import { Injectable } from '@nestjs/common';
import { CategoriaVersaoCache } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { CategoriaImpl } from '../core/models/impl/categoria/categoria';
import { MysqlService } from '../core/mysql/mysql.service';
import { ResultQuery } from '../core/result-query';

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

  async recuperarPorNomeFiltroDezPrimeiros(filtro: string) {
    const res = await this.mysqlService.query(
      'call Categoria_recuperarPorNomeFiltroDezPrimeiros(?);',
      [filtro],
    );

    ResultQuery.create(res).normalizeResult();
    return res.map((e) => plainToInstance(CategoriaImpl, e));
  }
}

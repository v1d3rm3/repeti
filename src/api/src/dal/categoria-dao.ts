import { Injectable } from '@nestjs/common';
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

  async recuperarTodas() {
    const res = await this.mysqlService.query(
      'call categoria_recuperarTodas(?);',
      [],
    );

    const resultadoNormalizado = ResultQuery.create(res).normalizeResult();
    return res.map((e) => plainToInstance(CategoriaImpl, e));
  }
}

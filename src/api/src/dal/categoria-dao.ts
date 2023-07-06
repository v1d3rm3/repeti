import { Injectable } from '@nestjs/common';
import { MysqlService } from '../core/mysql/mysql.service';
import { ResultQuery } from '../core/result-query';
import { ICategoriaDao } from './i-categoria-dao';

@Injectable()
export class CategoriaDao implements ICategoriaDao {
  constructor(private readonly mysqlService: MysqlService) {}

  async recuperarPorNome(nome: string) {
    const res = await this.mysqlService.query(
      'call categoria_recuperarPorNome(?);',
      [nome],
    );

    // TODO
    return ResultQuery.create(res).normalizeResult();
  }

  async recuperarTodas() {
    const res = await this.mysqlService.query(
      'call categoria_recuperarTodas(?);',
      [],
    );

    // TODO
    const resultadoNormalizado = ResultQuery.create(res).normalizeResult();
    return resultadoNormalizado;
  }
}

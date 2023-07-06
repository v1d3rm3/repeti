import { Injectable } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { DaoParamsWrapper } from '../core/dao-params';
import { EstudoImpl } from '../core/models/impl/estudo/estudo';
import { IEstudo } from '../core/models/interface/estudo';
import { MysqlService } from '../core/mysql/mysql.service';
import { ResultQuery } from '../core/result-query';

@Injectable()
export class EstudoDao {
  constructor(private readonly mysqlService: MysqlService) {}

  async criar(params: DaoParamsWrapper<IEstudo>) {
    const [res] = await this.mysqlService.query(
      'call estudo_cadastrar(?,?,?);',
      [
        params.data.estudanteId,
        params.data.categoriaId,
        params.data.nivelAtual,
      ],
    );

    ResultQuery.create(res).normalizeResult();
    return plainToClass(EstudoImpl, res);
  }

  async listar(params: DaoParamsWrapper<number>) {
    const res = await this.mysqlService.query('call estudo_recuperar(?);', [
      params.data,
    ]);

    ResultQuery.create(res).normalizeResult();
    return plainToInstance(EstudoImpl, res);
  }

  async recuperarAtivaPorCategoriaId(
    params: DaoParamsWrapper<Pick<IEstudo, 'estudanteId' | 'categoriaId'>>,
  ) {
    const [res] = await this.mysqlService.query(
      'call estudo_recuperarAtivaPorCategoriaId(?, ?);',
      [params.data.estudanteId, params.data.categoriaId],
    );

    ResultQuery.create(res).normalizeResult();
    return plainToInstance(EstudoImpl, res);
  }

  async recuperarPorId(params: DaoParamsWrapper<number>) {
    const [res] = await this.mysqlService.query(
      'call estudo_recuperarPorId(?);',
      [params.data],
    );

    ResultQuery.create(res).normalizeResult();
    return plainToInstance(EstudoImpl, res);
  }
}

import { Injectable } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { DaoParamsWrapper } from '../core/dao-params';
import { EstudoImpl } from '../core/models/impl/estudo/estudo';
import { QuestaoEstudadaImpl } from '../core/models/impl/questao/questao-estudada';
import { IEstudo } from '../core/models/interface/estudo';
import { IQuestaoEstudada } from '../core/models/interface/questao-estudada';
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

  async atualizarNivelAtual(params: DaoParamsWrapper<IEstudo>) {
    await this.mysqlService.query('call Estudo_atualizarNivelAtual(?, ?);', [
      params.data.id,
      params.data.nivelAtual,
    ]);

    return {};
  }

  async criarQuestaoEstudadaEmEstudo(
    params: DaoParamsWrapper<IQuestaoEstudada>,
  ) {
    const [res] = await this.mysqlService.query(
      'call Estudo_criarQuestaoEstudadaEmEstudo(?,?,?,?);',
      [
        params.data.estudanteId,
        params.data.estudoId,
        params.data.alternativaId,
        params.data.acertou,
      ],
    );

    ResultQuery.create(res).normalizeResult();
    return plainToInstance(QuestaoEstudadaImpl, res);
  }

  async recuperarQuestaoEstudadaPorQuestaoId(
    params: DaoParamsWrapper<{ questaoId: number; estudoId: number }>,
  ) {
    const [res] = await this.mysqlService.query(
      'call Estudo_recuperarQuestaoEstudadaPorQuestaoId(?,?);',
      [params.data.estudoId, params.data.questaoId],
    );
    ResultQuery.create(res).normalizeResult();
    return plainToInstance(QuestaoEstudadaImpl, res);
  }
}

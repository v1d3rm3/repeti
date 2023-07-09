import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PoolConnection } from 'mysql2/promise';
import { DaoParamsWrapper } from '../core/dao-params';
import { QuestaoImpl } from '../core/models/impl/questao/questao';
import { QuestaoEstudadaImpl } from '../core/models/impl/questao/questao-estudada';
import { IQuestao } from '../core/models/interface/questao';
import { IQuestaoEstudada } from '../core/models/interface/questao-estudada';
import { MysqlService } from '../core/mysql/mysql.service';
import { ResultQuery } from '../core/result-query';

@Injectable()
export class QuestaoEstudadaDao {
  constructor(private readonly mysqlService: MysqlService) {}

  async recuperarSomenteIdPorEstudo(
    params: DaoParamsWrapper<number>,
  ): Promise<Pick<IQuestao, 'id'>[]> {
    const res = await this.mysqlService.query<IQuestao>(
      'call QuestaoEstudada_recuperarQuestoesPorEstudoSomenteId(?);',
      [params.data],
    );

    ResultQuery.create(res).normalizeResult();
    return res.map((e) => plainToInstance(QuestaoImpl, e));
  }

  async recuperarPorId(params: DaoParamsWrapper<number>) {
    const [res] = await this.mysqlService.query<IQuestaoEstudada>(
      'call QuestaoEstudada_recuperarPorId(?);',
      [params.data],
    );

    ResultQuery.create(res).normalizeResult();
    return plainToInstance(QuestaoEstudadaImpl, res);
  }

  async recuperarPorQuestaoIdSomenteIdNivelEQualidade(
    params: DaoParamsWrapper<number>,
  ) {
    const res = await this.mysqlService.query<IQuestaoEstudada>(
      'call QuestaoEstudada_recuperarPorQuestaoIdSomenteIdNivelEQualidade(?);',
      [params.data],
    );

    ResultQuery.create(res).normalizeResult();
    return res.map((e) => plainToInstance(QuestaoEstudadaImpl, e));
  }

  async atualizarNivelEQualidade(params: DaoParamsWrapper<IQuestaoEstudada>) {
    const [res] = await this.mysqlService.query<IQuestaoEstudada>(
      'call QuestaoEstudada_atualizarNivelEQualidade(?,?,?);',
      [params.data.id, params.data.nivel, params.data.qualidade],
      params?.tx as PoolConnection,
    );

    ResultQuery.create(res).normalizeResult();
    return plainToInstance(QuestaoEstudadaImpl, res);
  }

  /**
   * Aqui entende-se que a questão estudada será fora
   * de um estudo.
   */
  async criar(params: DaoParamsWrapper<IQuestaoEstudada>) {
    const [res] = await this.mysqlService.query<IQuestaoEstudada>(
      'call QuestaoEstudada_criar(?,?,?);',
      [params.data.estudanteId, params.data.alternativaId, params.data.acertou],
      params?.tx as PoolConnection,
    );

    ResultQuery.create(res).normalizeResult();
    return plainToInstance(QuestaoEstudadaImpl, res);
  }
}

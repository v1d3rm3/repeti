import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DaoParamsWrapper } from '../core/dao-params';
import { QuestaoEstudadaImpl } from '../core/models/impl/questao/questao-estudada';
import { IQuestaoEstudada } from '../core/models/interface/questao-estudada';
import { MysqlService } from '../core/mysql/mysql.service';
import { ResultQuery } from '../core/result-query';

@Injectable()
export class QuestaoEstudadaDao {
  constructor(private readonly mysqlService: MysqlService) {}

  async recuperarSomenteIdPorEstudo(
    params: DaoParamsWrapper<number>,
  ): Promise<Pick<IQuestaoEstudada, 'id'>[]> {
    const res = await this.mysqlService.query<IQuestaoEstudada>(
      'call QuestaoEstudada_recuperarSomenteIdPorEstudo(?);',
      [params.data],
    );

    ResultQuery.create(res).normalizeResult();
    return res.map((e) => plainToInstance(QuestaoEstudadaImpl, e));
  }
}

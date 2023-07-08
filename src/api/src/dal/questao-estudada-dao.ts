import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DaoParamsWrapper } from '../core/dao-params';
import { QuestaoImpl } from '../core/models/impl/questao/questao';
import { IQuestao } from '../core/models/interface/questao';
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
}

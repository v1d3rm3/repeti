import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { plainToClass, plainToInstance } from 'class-transformer';
import { DaoParamsWrapper } from '../core/dao-params';
import { AlternativaImpl } from '../core/models/impl/questao/alternativa';
import { QuestaoImpl } from '../core/models/impl/questao/questao';
import { IAlternativa } from '../core/models/interface/alternativa';
import { IEstudo } from '../core/models/interface/estudo';
import { IQuestao } from '../core/models/interface/questao';
import { MysqlService } from '../core/mysql/mysql.service';
import { PrismaService } from '../core/prisma/prisma.service';
import { ResultQuery } from '../core/result-query';

@Injectable()
export class QuestaoDao {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mysqlService: MysqlService,
  ) {}

  async criar(params: DaoParamsWrapper<IQuestao>) {
    const prisma: Prisma.TransactionClient | PrismaClient =
      params?.tx ?? this.prismaService;

    const isTransaction = params?.tx ? true : false;
    let res: IEstudo;

    try {
      if (!isTransaction) {
        [res] = await (prisma as PrismaClient).$transaction(async (tx) => {
          return await this.criarQuery(params.data, tx);
        });
      } else {
        [res] = await this.criarQuery(params.data, params.tx);
      }
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }

    ResultQuery.create(res).normalizeResult();
    return plainToClass(QuestaoImpl, res);
  }

  private async criarQuery(
    questao: IQuestao,
    prisma: Prisma.TransactionClient,
  ) {
    await prisma.$queryRaw`
          insert into questao (enunciado, qualidade, nivel, elaborar_id, categoria_id)
          values (
            ${questao.enunciado},
            ${questao.qualidade},
            ${questao.nivel},
            ${questao.elaboradorId},
            ${questao.categoriaId}

        )`;

    const [{ id: lastId }] =
      await prisma.$queryRaw<any>`select last_insert_id() 'id'`;

    return await prisma.$queryRaw<IEstudo[]>`
        select
          -- CONTINUA...
        from questao q
        where e.id = ${lastId};
      `;
  }

  async recuperarPorCategoriaSomenteId(
    params: DaoParamsWrapper<number>,
  ): Promise<Pick<IQuestao, 'id'>[]> {
    const res = await this.mysqlService.query<IQuestao>(
      'call Questao_recuperarSomenteIdPorCategoria(?);',
      [params.data],
    );

    ResultQuery.create(res).normalizeResult();
    return res.map((e) => plainToInstance(QuestaoImpl, e));
  }

  async recuperarPorIds(
    params: DaoParamsWrapper<number[]>,
  ): Promise<IQuestao[]> {
    if (params.data?.length === 0) {
      return [];
    }

    const res = await this.mysqlService.query<IQuestao>(
      'call Questao_recuperarPorIds(?);',
      [params.data.join(',')],
    );

    ResultQuery.create(res).normalizeResult();
    return res.map((e) => plainToInstance(QuestaoImpl, e));
  }

  async recuperarAlternativasPorQuestaoId(
    params: DaoParamsWrapper<number>,
  ): Promise<IAlternativa[]> {
    const res = await this.mysqlService.query<IQuestao>(
      'call Questao_recuperarAlternativasPorQuestaoId(?);',
      [params.data],
    );

    ResultQuery.create(res).normalizeResult();
    return res.map((e) => plainToInstance(AlternativaImpl, e));
  }
}

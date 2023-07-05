import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { DaoParamsWrapper } from '../core/dao-params';
import { EstudoImpl } from '../core/models/impl/estudo/estudo';
import { IEstudo } from '../core/models/interface/estudo';
import { PrismaService } from '../core/prisma/prisma.service';
import { ResultQuery } from '../core/result-query';

@Injectable()
export class EstudoDao {
  constructor(private readonly prismaService: PrismaService) {}

  async criar(params: DaoParamsWrapper<IEstudo>) {
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
    return plainToClass(EstudoImpl, res);
  }

  private async criarQuery(estudo: IEstudo, prisma: Prisma.TransactionClient) {
    await prisma.$queryRaw`
          insert into estudo (estudante_id, categoria_id, nivel_atual)
          values (
            ${estudo.estudanteId},
            ${estudo.categoriaId},
            ${estudo.nivelAtual}

        )`;

    const [{ id: lastId }] =
      await prisma.$queryRaw<any>`select last_insert_id() 'id'`;

    return await prisma.$queryRaw<IEstudo[]>`
        select
          e.id 'id',
          e.categoria_id 'categoriaId',
          e.estudante_id 'estudanteId',
          e.nivel_atual 'nivelAtual',
          u.id 'estudante.id',
          u.nome 'estudante.nome',
          u.sobrenome 'estudante.sobrenome',
          u.email 'estudante.email',
          c.id 'categoria.id',
          c.nome 'categoria.nome'
        from estudo e
        left join usuario u 
        on u.id = e.estudante_id
        left join categoria c 
        on c.id = e.categoria_id
        where e.id = ${lastId};
      `;
  }

  async recuperarPorNome(nome: string) {
    const res: object[] = await this.prismaService.$queryRaw`
      select 
        c1.id 'id',  
        c1.nome 'nome', 
        c2.id 'pai.id',
        c2.nome 'pai.nome'
      from categoria c1
      left join categoria c2
      on c2.categoria_pai_id = c1.id
      where isnull(${nome}) or c1.nome like concat('%', concat(${nome}, '%'))
    `;

    return ResultQuery.create(res).normalizeResult();
  }
}

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { DaoParamsWrapper } from '../../core/dao-params';
import { UsuarioImpl } from '../../core/models/impl/usuario';
import { IUsuario } from '../../core/models/interface/usuario';
import { PrismaService } from '../../core/prisma/prisma.service';
import { ResultQuery } from '../../core/result-query';

@Injectable()
export class UsuarioDao {
  constructor(private readonly prismaService: PrismaService) {}

  async cadastrar(params: DaoParamsWrapper<IUsuario>) {
    const prisma: Prisma.TransactionClient | PrismaClient =
      params?.tx ?? this.prismaService;
    const isTransaction = params?.tx ? true : false;

    if (!isTransaction) {
      const end_result = await (prisma as PrismaClient).$transaction(
        async (tx) => {
          return await this.cadastrar({ data: params.data, tx });
        },
      );
      return ResultQuery.create(end_result).normalizeResult();
    } else {
      try {
        await prisma.$queryRaw`
        insert into usuario (nome, sobrenome, email, senha)
        values (
          ${params.data.nome},
          ${params.data.sobrenome},
          ${params.data.email},
          ${params.data.senha}
        )
      `;

        const [{ id: lastId }] =
          await prisma.$queryRaw<any>`select last_insert_id() 'id'`;

        return prisma.$queryRaw`
          select
            u.id 'id',
            u.nome 'nome',
            u.sobrenome 'sobrenome',
            u.email 'email'
          from usuario u
          where u.id = ${lastId};
        `;
      } catch (e) {
        if (e?.meta?.code == 1062) {
          throw new BadRequestException('Usuário já existe');
        } else {
          console.error(e);
          throw new InternalServerErrorException(e);
        }
      }
    }
  }

  async recuperarPorEmail(params: DaoParamsWrapper<string>) {
    const prisma = params?.tx ?? this.prismaService;

    console.log(params);

    const [res]: any = await prisma.$queryRaw`
      select 
        u.id 'id',
        u.nome 'nome',
        u.sobrenome 'sobrenome',
        u.email 'email',
        u.senha '_senha'
      from usuario u
      where u.email = ${params.data}
    `;

    return plainToClass(
      UsuarioImpl,
      ResultQuery.create(res).normalizeResult(),
    ) as IUsuario;
  }
}

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DaoParamsWrapper } from '../../core/dao-params';
import { PrismaService } from '../../core/prisma.service';
import { ResultQuery } from '../../core/result-query';

@Injectable()
export class UsuarioDao {
  constructor(private readonly prismaService: PrismaService) {}

  async recuperarPorEmail(params: DaoParamsWrapper<string>) {
    const prisma = params?.tx ?? this.prismaService;

    const [res]: any = await prisma.$queryRaw`
      select 
        u.id 'id',
        u.nome 'nome',
        u.sobrenome 'sobrenome',
        u.email 'email',
        u.senha 'senha'
      from usuario u
      where u.email = ${params.data}
    `;

    return ResultQuery.create(
      res,
    ).normalizeResult() as Prisma.UsuarioGetPayload<{
      select: {
        id;
        email;
        nome;
        senha;
        sobrenome;
      };
    }>;
  }
}

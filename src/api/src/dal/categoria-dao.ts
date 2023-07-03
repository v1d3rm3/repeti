import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { ResultQuery } from '../core/result-query';
import { ICategoriaDao } from './i-categoria-dao';

@Injectable()
export class CategoriaDao implements ICategoriaDao {
  constructor(private readonly prismaService: PrismaService) {}

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

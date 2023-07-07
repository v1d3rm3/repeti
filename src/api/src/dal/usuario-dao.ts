import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { DaoParamsWrapper } from '../core/dao-params';
import { UsuarioImpl } from '../core/models/impl/usuario';
import { IUsuario } from '../core/models/interface/usuario';
import { MysqlService } from '../core/mysql/mysql.service';
import { ResultQuery } from '../core/result-query';

@Injectable()
export class UsuarioDao {
  constructor(private readonly mysqlService: MysqlService) {}

  async cadastrar(params: DaoParamsWrapper<IUsuario>) {
    try {
      const [res] = await this.mysqlService.query(
        'call usuario_cadastrar(?,?,?,?);',
        [
          params.data.email,
          params.data.nome,
          params.data.sobrenome,
          params.data.senha,
        ],
      );

      return plainToClass(
        UsuarioImpl,
        ResultQuery.create(res).normalizeResult(),
      ) as IUsuario;
    } catch (e) {
      console.error(e?.code);
      if (e?.code === 'ER_DUP_ENTRY')
        throw new BadRequestException('Este usuário já existe');
      else throw new InternalServerErrorException();
    }
  }

  async recuperarPorEmail(params: DaoParamsWrapper<string>) {
    const [res] = await this.mysqlService.query(
      'call usuario_recuperarPorEmail(?);',
      [params.data],
    );

    return plainToClass(
      UsuarioImpl,
      ResultQuery.create(res).normalizeResult(),
    ) as IUsuario;
  }
}

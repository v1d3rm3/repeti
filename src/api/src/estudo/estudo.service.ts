import { BadRequestException, Injectable } from '@nestjs/common';
import { EstudoBuilder } from '../core/models/impl/estudo/estudo-builder';
import { Nivel } from '../core/models/interface/nivel';
import { EstudoCadastrarReq } from '../core/models/rest/estudo/estudo-cadastrar-req';
import { EstudoDao } from '../dal/estudo-dao';
import { UsuarioDao } from '../dal/usuario/usuario-dao';
import { ProximaQuestaoTemplateMethod } from './framework/proxima-questao-template-method';

@Injectable()
export class EstudoService {
  constructor(
    private readonly estudoDao: EstudoDao,
    private readonly usuarioDao: UsuarioDao,
    private readonly proximaQuestaoTemplateMethod: ProximaQuestaoTemplateMethod,
  ) {}

  async cadastrar(estudo: EstudoCadastrarReq, email: string) {
    const usuario = await this.usuarioDao.recuperarPorEmail({ data: email });

    if (
      await this.estudoDao.recuperarAtivaPorCategoriaId({
        data: { categoriaId: estudo.categoriaId, estudanteId: usuario.id },
      })
    ) {
      throw new BadRequestException(
        'Já existe um estudo cadastrado para essa categoria',
      );
    }
    const estudoItem = EstudoBuilder.create()
      .categoriaId(estudo.categoriaId)
      .estudanteId(usuario.id)
      .nivelAtual(Nivel.MuitoFacil)
      .build();

    return await this.estudoDao.criar({ data: estudoItem });
  }

  async proximaQuestao(estudoId: number, email: string) {
    const usuario = await this.usuarioDao.recuperarPorEmail({ data: email });
    const estudo = await this.estudoDao.recuperarPorId({ data: estudoId });

    if (!estudo) {
      throw new BadRequestException('Estudo não existe');
    }

    if (estudo.estudante.id !== usuario.id) {
      throw new BadRequestException('Você não é dono deste estudo');
    }
  }

  async listar(email: string) {
    const usuario = await this.usuarioDao.recuperarPorEmail({ data: email });
    return await this.estudoDao.listar({ data: usuario.id });
  }
}

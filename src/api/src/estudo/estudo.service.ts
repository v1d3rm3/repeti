import { Injectable } from '@nestjs/common';
import { EstudoCadastrarReq } from '../core/models/rest/estudo/estudo-cadastrar-req';
import { EstudoBuilder } from '../core/models/impl/estudo/estudo-builder';

@Injectable()
export class EstudoService {

  async cadastrar(estudo: EstudoCadastrarReq, usuarioId: number) {
    const estudoItem = EstudoBuilder.create()
      .categoriaId(estudo.categoriaId)
      .estudanteId(estudo.estudanteId)
      .build();
    // PARA BANCO DE DADOS
  }
}

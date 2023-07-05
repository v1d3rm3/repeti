import { Estudo } from '@prisma/client';
import { IEstudo } from '../../interface/estudo';

export class EstudoParaBancoMapper {
  static mapear(estudo: IEstudo) {
    return {
      nivel_atual: estudo.nivelAtual,
      categoria_id: estudo.categoriaId,
      estudante_id: estudo.estudanteId,
      id: estudo.id,
      desativado: estudo.desativado,
    } as Estudo;
  }
}

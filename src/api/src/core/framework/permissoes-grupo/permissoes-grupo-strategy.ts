import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class PermissoesGrupoStrategy {
  abstract temPermissao(
    categoriaId: number,
    usuarioId: number,
  ): Promise<boolean>;
}

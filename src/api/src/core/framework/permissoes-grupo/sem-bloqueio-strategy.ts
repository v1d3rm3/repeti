import { Logger } from '@nestjs/common';
import { PermissoesGrupoStrategy } from './permissoes-grupo-strategy';

export class SemBloqueioStrategy extends PermissoesGrupoStrategy {
  private logger = new Logger(PermissoesGrupoStrategy.name);

  constructor() {
    super();
    this.logger.verbose(
      'SemBloqueioStrategy foi escolhida ' +
        'como implementação de PermissoesGrupoStrategy',
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async temPermissao(categoriaId: number, usuarioId: number): Promise<boolean> {
    return true;
  }
}

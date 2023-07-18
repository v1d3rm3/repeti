import { Logger } from '@nestjs/common';
import { CategoriaStore } from '../../../categoria-store';
import { UsuarioCategoriaStore } from '../../../usuario-categoria-store';
import { PermissoesGrupoStrategy } from './permissoes-grupo-strategy';

export class BloqueioPorGrupoStrategy extends PermissoesGrupoStrategy {
  private logger = new Logger(PermissoesGrupoStrategy.name);

  constructor(
    private readonly usuarioCategoriaStore: UsuarioCategoriaStore,
    private readonly categoriaStore: CategoriaStore,
  ) {
    super();
    this.logger.verbose(
      'BloqueioPorGrupoStrategy foi escolhida ' +
        'como implementação de PermissoesGrupoStrategy',
    );
  }

  async temPermissao(categoriaId: number, usuarioId: number): Promise<boolean> {
    const categoriasIds =
      await this.usuarioCategoriaStore.recuperarCategoriasDoUsuario(usuarioId);
    const todasAsCategoriasDoUsuario = [];
    categoriasIds.forEach((e) => {
      todasAsCategoriasDoUsuario.push(
        ...this.categoriaStore
          .recuperarTodasAsSubcategorias(e)
          .map((e) => e.id),
      );
    });
    return todasAsCategoriasDoUsuario.some((e) => e === categoriaId);
  }
}

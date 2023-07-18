import { Injectable } from '@nestjs/common';
import { CategoriaStore } from '../categoria-store';
import { CategoriaDao } from '../dal/categoria-dao';
import { PermissoesGrupoStrategy } from '../core/framework/permissoes-grupo/permissoes-grupo-strategy';
import { UsuarioDao } from '../dal/usuario-dao';

@Injectable()
export class CategoriaService {
  constructor(
    private categoriaDao: CategoriaDao,
    private readonly categoriaStore: CategoriaStore,
    private readonly permissoesGrupoStrategy: PermissoesGrupoStrategy,
    private readonly usuarioDao: UsuarioDao,
  ) {}

  async recuperar(nome: string, email: string) {
    const usuario = await this.usuarioDao.recuperarPorEmail({ data: email });
    const categoriasFinal = this.categoriaStore
      .recuperarTodasAsCategorias()
      .filter((e) =>
        this.permissoesGrupoStrategy.temPermissao(e.id, usuario.id),
      );
    return categoriasFinal;
  }

  async recuperarPorNomeFiltroDezPrimeiros(filtro: string, email: string) {
    const usuario = await this.usuarioDao.recuperarPorEmail({ data: email });
    return (
      await this.categoriaDao.recuperarPorNomeFiltroDezPrimeiros(filtro)
    ).filter((e) =>
      this.permissoesGrupoStrategy.temPermissao(e.id, usuario.id),
    );
  }
}

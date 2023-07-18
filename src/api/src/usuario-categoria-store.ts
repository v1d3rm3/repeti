import { Injectable } from '@nestjs/common';
import { UsuarioDao } from './dal/usuario-dao';

@Injectable()
export class UsuarioCategoriaStore {
  private _usuariosCategorias: Map<number, number[]> = new Map();

  constructor(private readonly usuarioDao: UsuarioDao) {}

  async recuperarCategoriasDoUsuario(usuarioId: number): Promise<number[]> {
    if (!this._usuariosCategorias.has(usuarioId)) {
      const res = (
        await this.usuarioDao.recuperarCategoriasPermissao({
          data: usuarioId,
        })
      ).map((e) => e.categoria_id);
      this._usuariosCategorias.set(usuarioId, res || []);
      return res;
    }
    return this._usuariosCategorias.get(usuarioId);
  }
}

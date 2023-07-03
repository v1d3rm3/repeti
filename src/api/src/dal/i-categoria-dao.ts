// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICategoriaDao {
  /**
   * Recupera várias categorias pelo
   * filtro de nome
   */
  recuperarPorNome(nome: string);
}

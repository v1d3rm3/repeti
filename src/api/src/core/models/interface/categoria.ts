import { Categoria } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICategoria extends Pick<Categoria, 'nome' | 'id'> {
  categoriaPai?: ICategoria;
}

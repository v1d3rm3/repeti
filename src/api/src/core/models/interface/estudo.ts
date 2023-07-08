import { Estudo } from '@prisma/client';
import { IUsuario } from './usuario';
import { ICategoria } from './categoria';
import { Nivel } from './nivel';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IEstudo extends Pick<Estudo, 'id' | 'desativado'> {
  categoriaId: number;
  estudanteId: number;
  nivelAtual: Nivel;
  categoria?: ICategoria;
  estudante?: IUsuario;
}

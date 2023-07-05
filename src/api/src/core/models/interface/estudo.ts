import { Estudo } from '@prisma/client';
import { IUsuario } from './usuario';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IEstudo extends Pick<Estudo, 'id' | 'desativado'> {
  categoriaId: number;
  estudanteId: number;
  nivelAtual: string;
  categoria?: any;
  estudante?: IUsuario;
}

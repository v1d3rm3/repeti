import { Estudo } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IEstudo extends Pick<Estudo, 'id' | 'desativado'> {
  categoriaId: number;
  estudanteId: number;
  nivelAtual: string;
}

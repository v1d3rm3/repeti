import { Grupo } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IGrupo extends Pick<Grupo, 'id' | 'nome'> {}

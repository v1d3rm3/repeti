import { IEstudo } from '../../interface/estudo';

export type EstudoCadastrarReq = Pick<IEstudo, 'estudanteId' | 'categoriaId'>;

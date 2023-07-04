import { IEstudo } from '../../interface/estudo';

export class EstudoImpl implements IEstudo {
  nivelAtual: string;
  id: number;
  desativado: Date;
  estudanteId: number;
  categoriaId: number;
}

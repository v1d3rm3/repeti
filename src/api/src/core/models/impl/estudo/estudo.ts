import { ICategoria } from '../../interface/categoria';
import { IEstudo } from '../../interface/estudo';
import { IUsuario } from '../../interface/usuario';

export class EstudoImpl implements IEstudo {
  nivelAtual: string;
  id: number;
  desativado: Date;
  estudanteId: number;
  categoriaId: number;
  categoria?: ICategoria;
  estudante?: IUsuario;
}

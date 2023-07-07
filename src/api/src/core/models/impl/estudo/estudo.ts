import { ICategoria } from '../../interface/categoria';
import { IEstudo } from '../../interface/estudo';
import { Nivel } from '../../interface/nivel';
import { IUsuario } from '../../interface/usuario';

export class EstudoImpl implements IEstudo {
  nivelAtual: Nivel;
  id: number;
  desativado: Date;
  estudanteId: number;
  categoriaId: number;
  categoria?: ICategoria;
  estudante?: IUsuario;
}

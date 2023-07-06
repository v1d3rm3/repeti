import { ICategoria } from '../../interface/categoria';

export class CategoriaImpl implements ICategoria {
  id: number;
  nome: string;
  categoriaPai?: ICategoria;
}

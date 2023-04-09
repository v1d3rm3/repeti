import { IPermissao } from './permissao';

export interface IUsuario {
  id: number;
  nome: string;
  email: string;
  permissoes: IPermissao[];
}

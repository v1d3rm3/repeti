import { IPermissao } from '../models/permissao';

export interface IListarUsuarioResponseDto {
  id: number;
  nome: string;
  email: string;
  permissoes: IPermissao[];
}

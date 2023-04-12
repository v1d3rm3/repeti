export interface IAutenticarResponseDto {
  email: string;
  tipo: string;
  token: string;
}

export interface IUsuarioAutenticadoInfoResponseDto {
  nome: string;
  email: string;
  permissoes: {
    id: number;
    nome: string;
    authority: string;
  }[];
}

export enum UsuarioPapel {
  Administrador = 'ROLE_ADMIN',
  ClienteFree = 'ROLE_CLIENTEFREE',
  ClientePro = 'ROLE_CLIENTEPRO'
}

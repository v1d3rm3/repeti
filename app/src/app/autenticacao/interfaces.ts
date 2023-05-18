export interface IAutenticarResponseDto {
  email: string;
  tipo: string;
  token: string;
}

export interface IUsuarioAutenticadoInfoResponseDto {
  nome: string;
  email: string;
  authorities: {
    id: number;
    nome: string;
    authority: string;
  }[];
}

export enum UsuarioPapel {
  Usuario = 'ROLE_USER',
}

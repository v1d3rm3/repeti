import { Usuario } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUsuario extends Usuario {
  setSenhaComCriptografia(senha: string);
  setSenhaSemCriptografia(senha: string);
  compararSenha(senhaDescriptografada: string): boolean | Promise<boolean>;
}

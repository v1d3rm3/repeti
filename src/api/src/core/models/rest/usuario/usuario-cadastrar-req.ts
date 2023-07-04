import { Usuario } from '@prisma/client';

export type UsuarioCadastrarReq = Pick<
  Usuario,
  'nome' | 'email' | 'senha' | 'sobrenome'
>;

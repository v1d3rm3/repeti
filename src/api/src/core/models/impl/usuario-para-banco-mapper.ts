import { Usuario } from '@prisma/client';
import { IUsuario } from '../interface/usuario';

export class UsuarioParaBancoMapper {
  static mapear(usuario: IUsuario) {
    return {
      id: usuario?.id,
      email: usuario?.email,
      nome: usuario?.nome,
      sobrenome: usuario?.sobrenome,
      senha: usuario?.senha,
    } as Usuario;
  }
}

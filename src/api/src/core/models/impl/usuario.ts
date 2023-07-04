import * as bcrypt from 'bcrypt';
import { IUsuario } from '../interface/usuario';

export class UsuarioImpl implements IUsuario {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  private _senha: string;
  get senha() {
    return this._senha;
  }

  setSenhaComCriptografia(senha) {
    this._senha = senha;
  }

  async setSenhaSemCriptografia(senha) {
    const s = await bcrypt.hash(senha, 10);
    this._senha = s;
  }
}

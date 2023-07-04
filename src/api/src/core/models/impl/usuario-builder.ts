import { IUsuario } from '../interface/usuario';
import { UsuarioImpl } from './usuario';

export class UsuarioBuilder {
  private _usuario: IUsuario;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static create() {
    const builder = new UsuarioBuilder();
    builder._usuario = new UsuarioImpl();
    return builder;
  }

  nome(nome: string) {
    this._usuario.nome = nome;
    return this;
  }

  sobrenome(sobrenome: string) {
    this._usuario.sobrenome = sobrenome;
    return this;
  }

  email(email: string) {
    this._usuario.email = email;
    return this;
  }

  senhaCriptografada(senhaCriptografada: string) {
    this._usuario.setSenhaComCriptografia(senhaCriptografada);
    return this;
  }

  async senhaSemCriptografiaAsync(senhaSemCriptografia: string) {
    await this._usuario.setSenhaSemCriptografia(senhaSemCriptografia);
    return this;
  }

  build() {
    return this._usuario;
  }
}

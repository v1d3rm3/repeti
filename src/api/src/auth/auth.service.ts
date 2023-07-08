import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioDao } from '../dal/usuario-dao';

@Injectable()
export class AuthService {
  constructor(private usuarioDao: UsuarioDao, private jwtService: JwtService) {}

  async login(username, pass) {
    const usuario = await this.usuarioDao.recuperarPorEmail({ data: username });

    if (!usuario || !(await usuario.compararSenha(pass))) {
      throw new UnauthorizedException();
    }
    const payload = { username: usuario.email, sub: usuario.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async me(email: string) {
    const usuario = await this.usuarioDao.recuperarPorEmail({ data: email });
    usuario['_senha'] = undefined;
    return usuario;
  }
}

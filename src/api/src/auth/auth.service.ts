import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioDao } from '../dal/usuario/usuario-dao';

@Injectable()
export class AuthService {
  constructor(private usuarioDao: UsuarioDao, private jwtService: JwtService) {}

  async signIn(username, pass) {
    const usuario = await this.usuarioDao.recuperarPorEmail({ data: username });
    console.log(username, pass);

    console.log(usuario);

    if (usuario?.senha !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: usuario.email, sub: usuario.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

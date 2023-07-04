import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from '../core/decorators/public.decorator';
import { UsuarioCadastrarReq } from '../core/models/rest/usuario/usuario-cadastrar-req';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('')
  async cadastrar(@Body() params: UsuarioCadastrarReq) {
    return await this.usuarioService.cadastrar(params);
  }
}

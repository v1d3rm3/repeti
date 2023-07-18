import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { CategoriaService } from './categoria.service';

@Controller('categoria')
export class CategoriaController {
  constructor(private categoriaService: CategoriaService) {}

  @Get('')
  async recuperar(@Query('nome') nome: string, @Req() req) {
    return await this.categoriaService.recuperar(nome, req.user.username);
  }

  @Get('nome/:filtro')
  async recuperarPorNomeFILTRODezPrimeiros(
    @Param('filtro') filtro: string,
    @Req() req,
  ) {
    return await this.categoriaService.recuperarPorNomeFiltroDezPrimeiros(
      filtro,
      req.user.username,
    );
  }
}

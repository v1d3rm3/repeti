import { Controller, Get, Query } from '@nestjs/common';
import { CategoriaService } from './categoria.service';

@Controller('categoria')
export class CategoriaController {
  constructor(private categoriaService: CategoriaService) {}

  @Get('')
  async recuperar(@Query('nome') nome: string) {
    return await this.categoriaService.recuperar(nome);
  }
}

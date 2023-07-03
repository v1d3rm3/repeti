import { Controller, Get } from '@nestjs/common';
import { CategoriaService } from './categoria.service';

@Controller('categoria')
export class CategoriaController {
  constructor(private categoriaService: CategoriaService) {}

  @Get('por-nome')
  async recuperarPorNome() {
    return await this.categoriaService.recuperarPorNome('');
  }
}

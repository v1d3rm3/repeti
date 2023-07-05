import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { EstudoCadastrarReq } from '../core/models/rest/estudo/estudo-cadastrar-req';
import { EstudoService } from './estudo.service';

@Controller('estudo')
export class EstudoController {
  constructor(private estudoService: EstudoService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async criar(@Body() params: EstudoCadastrarReq, @Req() req) {
    return await this.estudoService.cadastrar(params, req.user.username);
  }
}

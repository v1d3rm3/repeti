import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { EstudoCadastrarReq } from '../core/models/rest/estudo/estudo-cadastrar-req';
import { EstudoProximaQuestaoReq } from '../core/models/rest/estudo/estudo-proxima-questao-req';
import { EstudoResolverQuestaoReq } from '../core/models/rest/estudo/estudo-resolver-questao-req';
import { EstudoService } from './estudo.service';

@Controller('estudo')
export class EstudoController {
  constructor(private estudoService: EstudoService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async criar(@Body() params: EstudoCadastrarReq, @Req() req) {
    return await this.estudoService.cadastrar(params, req.user.username);
  }

  @Get()
  async listar(@Req() req) {
    return await this.estudoService.listar(req.user.username);
  }

  @Get('proxima-questao')
  async proximaQuestao(@Query() params: EstudoProximaQuestaoReq, @Req() req) {
    return await this.estudoService.proximaQuestao(
      Number(params.estudoId),
      req.user.username,
    );
  }

  @Post('resolver-questao')
  async resolverQuestao(@Body() params: EstudoResolverQuestaoReq, @Req() req) {
    return await this.estudoService.resolverQuestao(
      params.estudoId,
      params.questaoId,
      params.alternativaId,
      req.user.username,
    );
  }
}

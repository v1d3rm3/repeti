import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { EstudoAvaliarQuestaoReq } from '../core/models/rest/estudo/estudo-avaliar-questao-req';
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

  @Get('id/:id')
  async recuperarPorId(@Param('id') estudoId: number, @Req() req) {
    return await this.estudoService.recuperarPorId(
      Number(estudoId),
      req.user.username,
    );
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

  @Post('avaliar-questao')
  async avaliarQuestao(@Body() params: EstudoAvaliarQuestaoReq, @Req() req) {
    return await this.estudoService.avaliarQuestao(
      params.questaoEstudadaId,
      params.nivel,
      params.qualidade,
      req.user.username,
    );
  }

  @Delete()
  async desativar(@Query() params: { estudoId: number }, @Req() req) {
    return await this.estudoService.desativar(
      Number(params.estudoId),
      req.user.username,
    );
  }
}

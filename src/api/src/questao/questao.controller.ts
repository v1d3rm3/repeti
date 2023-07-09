import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { QuestaoCriarReq } from '../core/models/rest/questao/questao-criar-req';
import { QuestaoService } from './questao.service';
import { Nivel } from '../core/models/interface/nivel';
import { Qualidade } from '../core/models/interface/qualidade';

@Controller('questao')
export class QuestaoController {
  constructor(private readonly questaoService: QuestaoService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async criar(@Body() params: QuestaoCriarReq, @Req() req) {
    return await this.questaoService.criar(params, req.user.username);
  }

  @Get('proxima-questao')
  async proximaQuestao(@Query('categoriaId') categoriaId: number) {
    return await this.questaoService.proximaQuestao(Number(categoriaId));
  }

  @Post('resolver-questao')
  async resolverQuestao(
    @Body('questaoId', ParseIntPipe) questaoId: number,
    @Body('alternativaId', ParseIntPipe) alternativaId: number,
    @Req() req,
  ) {
    return await this.questaoService.resolverQuestao(
      questaoId,
      alternativaId,
      req.user.username,
    );
  }

  @Post('avaliar-questao')
  async avaliarQuestao(
    @Body('questaoEstudadaId', ParseIntPipe) questaoEstudadaId: number,
    @Body('nivel') nivel: Nivel,
    @Body('qualidade') qualidade: Qualidade,
    @Req() req,
  ) {
    return await this.questaoService.avaliarQuestao(
      questaoEstudadaId,
      nivel,
      qualidade,
      req.user.username,
    );
  }
}

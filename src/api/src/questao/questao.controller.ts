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
import { QuestaoCriarReq } from '../core/models/rest/questao/questao-criar-req';
import { QuestaoService } from './questao.service';

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
}

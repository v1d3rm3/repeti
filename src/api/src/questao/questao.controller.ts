import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { QuestaoService } from './questao.service';
import { QuestaoCriarReq } from '../core/models/rest/questao/questao-criar-req';

@Controller('questao')
export class QuestaoController {
  constructor(private readonly questaoService: QuestaoService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async criar(@Body() params: QuestaoCriarReq, @Req() req) {
    return await this.questaoService.criar(params, req.user.username);
  }
}

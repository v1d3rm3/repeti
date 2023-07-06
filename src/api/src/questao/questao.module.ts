import { Module } from '@nestjs/common';
import { QuestaoController } from './questao.controller';
import { QuestaoService } from './questao.service';

@Module({
  controllers: [QuestaoController],
  providers: [QuestaoService],
})
export class QuestaoModule {}

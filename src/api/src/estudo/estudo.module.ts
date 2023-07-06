import { Module } from '@nestjs/common';
import { EstudoController } from './estudo.controller';
import { EstudoService } from './estudo.service';
import { ProximaQuestaoAleatoriaTemplateMethod } from './framework/proxima-questao-aleatoria-template-method';
import { ProximaQuestaoTemplateMethod } from './framework/proxima-questao-template-method';

@Module({
  controllers: [EstudoController],
  providers: [EstudoService],
})
export class EstudoModule {}

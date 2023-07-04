import { Module } from '@nestjs/common';
import { EstudoController } from './estudo.controller';
import { EstudoService } from './estudo.service';

@Module({
  controllers: [EstudoController],
  providers: [EstudoService],
})
export class EstudoModule {}

import { Global, Module } from '@nestjs/common';
import { CategoriaDao } from './categoria-dao';
import { EstudoDao } from './estudo-dao';
import { QuestaoDao } from './questao-dao';
import { QuestaoEstudadaDao } from './questao-estudada-dao';
import { UsuarioDao } from './usuario-dao';

@Global()
@Module({
  providers: [
    UsuarioDao,
    CategoriaDao,
    EstudoDao,
    QuestaoDao,
    QuestaoEstudadaDao,
  ],
  exports: [
    UsuarioDao,
    CategoriaDao,
    EstudoDao,
    QuestaoDao,
    QuestaoEstudadaDao,
  ],
})
export class DalModule {}

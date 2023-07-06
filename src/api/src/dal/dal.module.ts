import { Global, Module } from '@nestjs/common';
import { CategoriaDao } from './categoria-dao';
import { EstudoDao } from './estudo-dao';
import { QuestaoDao } from './questao-dao';
import { UsuarioDao } from './usuario/usuario-dao';

@Global()
@Module({
  providers: [UsuarioDao, CategoriaDao, EstudoDao, QuestaoDao],
  exports: [UsuarioDao, CategoriaDao, EstudoDao, QuestaoDao],
})
export class DalModule {}

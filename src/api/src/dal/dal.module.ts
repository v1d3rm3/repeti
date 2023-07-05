import { Global, Module } from '@nestjs/common';
import { CategoriaDao } from './categoria-dao';
import { UsuarioDao } from './usuario/usuario-dao';
import { EstudoDao } from './estudo-dao';

@Global()
@Module({
  providers: [UsuarioDao, CategoriaDao, EstudoDao],
  exports: [UsuarioDao, CategoriaDao, EstudoDao],
})
export class DalModule {}

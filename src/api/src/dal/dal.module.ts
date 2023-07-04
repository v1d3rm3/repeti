import { Global, Module } from '@nestjs/common';
import { CategoriaDao } from './categoria-dao';
import { UsuarioDao } from './usuario/usuario-dao';

@Global()
@Module({
  providers: [UsuarioDao, CategoriaDao],
  exports: [UsuarioDao, CategoriaDao],
})
export class DalModule {}

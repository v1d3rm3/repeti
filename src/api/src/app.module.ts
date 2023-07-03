import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CategoriaController } from './categoria/categoria.controller';
import { CategoriaService } from './categoria/categoria.service';
import { PrismaService } from './core/prisma.service';
import { CategoriaDao } from './dal/categoria-dao';
import { UsuarioDao } from './dal/usuario/usuario-dao';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  controllers: [CategoriaController],
  providers: [PrismaService, CategoriaService, CategoriaDao, UsuarioDao],
})
export class AppModule {}

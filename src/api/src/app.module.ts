import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CategoriaController } from './categoria/categoria.controller';
import { CategoriaService } from './categoria/categoria.service';
import { PrismaModule } from './core/prisma/prisma.module';
import { DalModule } from './dal/dal.module';
import { EstudoModule } from './estudo/estudo.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    EstudoModule,
    UsuarioModule,
    PrismaModule,
    DalModule,
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService],
})
export class AppModule {}

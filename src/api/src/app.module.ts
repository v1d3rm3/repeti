import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoriaController } from './categoria/categoria.controller';
import { CategoriaService } from './categoria/categoria.service';
import { PrismaService } from './core/prisma.service';
import { CategoriaDao } from './dal/categoria-dao';

@Module({
  imports: [],
  controllers: [AppController, CategoriaController],
  providers: [PrismaService, CategoriaService, CategoriaDao],
})
export class AppModule {}

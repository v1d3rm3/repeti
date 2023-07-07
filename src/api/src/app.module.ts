import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config as dotEnvConfig } from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { CategoriaStore, CategoriaStoreProvider } from './categoria-store';
import { CategoriaController } from './categoria/categoria.controller';
import { CategoriaService } from './categoria/categoria.service';
import { MysqlModule } from './core/mysql/mysql.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { ProvedorDinamicoProximaQuestao } from './core/providers/provedor-dinamico-proxima-questao';
import { DalModule } from './dal/dal.module';
import { EstudoModule } from './estudo/estudo.module';
import { ProximaQuestaoTemplateMethod } from './estudo/framework/proxima-questao-template-method';
import { QuestaoModule } from './questao/questao.module';
import { UsuarioModule } from './usuario/usuario.module';

// configurando dotenv para os provedores dinâmicos do framework
dotEnvConfig();

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    EstudoModule,
    UsuarioModule,
    QuestaoModule,
    PrismaModule,
    MysqlModule,
    DalModule,
  ],
  controllers: [CategoriaController],
  providers: [
    CategoriaService,
    ...ProvedorDinamicoProximaQuestao(ProximaQuestaoTemplateMethod),
    CategoriaStoreProvider(),
  ],
  exports: [ProximaQuestaoTemplateMethod, CategoriaStore],
})
export class AppModule {}

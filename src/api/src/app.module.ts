import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config as dotEnvConfig } from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { CategoriaStore, CategoriaStoreProvider } from './categoria-store';
import { CategoriaController } from './categoria/categoria.controller';
import { CategoriaService } from './categoria/categoria.service';
import { ContadorReavaliacaoQuestao } from './contador-reavaliacao-questao';
import { ReavaliacaoStrategy } from './core/framework/reavaliacao/reavaliacao-strategy';
import { MysqlModule } from './core/mysql/mysql.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { ProvedorDinamicoProximaQuestao } from './core/providers/provedor-dinamico-proxima-questao';
import { ProvedorDinamicoReavaliacaoQuestao } from './core/providers/provedor-dinamico-reavaliacao-questao';
import { DalModule } from './dal/dal.module';
import { EstudoModule } from './estudo/estudo.module';
import { QuestaoModule } from './questao/questao.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ProximaQuestaoTemplateMethod } from './core/framework/proxima-questao/proxima-questao-template-method';

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
    ...ProvedorDinamicoReavaliacaoQuestao(ReavaliacaoStrategy),
    CategoriaStoreProvider(),
    ContadorReavaliacaoQuestao,
  ],
  exports: [
    ProximaQuestaoTemplateMethod,
    ReavaliacaoStrategy,
    CategoriaStore,
    ContadorReavaliacaoQuestao,
  ],
})
export class AppModule {}

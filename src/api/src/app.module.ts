import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config as dotEnvConfig } from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { CategoriaStore, CategoriaStoreProvider } from './categoria-store';
import { CategoriaController } from './categoria/categoria.controller';
import { CategoriaService } from './categoria/categoria.service';
import { ContadorReavaliacaoQuestao } from './contador-reavaliacao-questao';
import { PermissoesGrupoStrategy } from './core/framework/permissoes-grupo/permissoes-grupo-strategy';
import { ProximaQuestaoTemplateMethod } from './core/framework/proxima-questao/proxima-questao-template-method';
import { ReavaliacaoStrategy } from './core/framework/reavaliacao/reavaliacao-strategy';
import { MysqlModule } from './core/mysql/mysql.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { ProvedorDinamicoPermissoesGrupo } from './core/providers/provedor-dinamico-permissoes';
import { ProvedorDinamicoProximaQuestao } from './core/providers/provedor-dinamico-proxima-questao';
import { ProvedorDinamicoReavaliacaoQuestao } from './core/providers/provedor-dinamico-reavaliacao-questao';
import { DalModule } from './dal/dal.module';
import { EstudoModule } from './estudo/estudo.module';
import { QuestaoModule } from './questao/questao.module';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioCategoriaStore } from './usuario-categoria-store';

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
    ...ProvedorDinamicoPermissoesGrupo(PermissoesGrupoStrategy),
    CategoriaStoreProvider(),
    ContadorReavaliacaoQuestao,
    UsuarioCategoriaStore,
  ],
  exports: [
    ProximaQuestaoTemplateMethod,
    ReavaliacaoStrategy,
    CategoriaStore,
    ContadorReavaliacaoQuestao,
    UsuarioCategoriaStore,
  ],
})
export class AppModule {}

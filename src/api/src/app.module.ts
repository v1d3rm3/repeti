import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CategoriaController } from './categoria/categoria.controller';
import { CategoriaService } from './categoria/categoria.service';
import { MysqlModule } from './core/mysql/mysql.module';
import { DalModule } from './dal/dal.module';
import { EstudoModule } from './estudo/estudo.module';
import { QuestaoModule } from './questao/questao.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { ProximaQuestaoTemplateMethod } from './estudo/framework/proxima-questao-template-method';
import { ProximaQuestaoAleatoriaTemplateMethod } from './estudo/framework/proxima-questao-aleatoria-template-method';

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
    {
      provide: ProximaQuestaoTemplateMethod,
      useFactory: () => {
        return ProximaQuestaoAleatoriaTemplateMethod;
      },
    },
  ],
  exports: [ProximaQuestaoTemplateMethod],
})
export class AppModule {}

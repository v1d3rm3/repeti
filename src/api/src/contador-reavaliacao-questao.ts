import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ReavaliacaoStrategy } from './core/framework/reavaliacao/reavaliacao-strategy';
import { IQuestao } from './core/models/interface/questao';
import { QuestaoEstudadaDao } from './dal/questao-estudada-dao';

@Injectable()
export class ContadorReavaliacaoQuestao {
  /**
   * Indica quantas vezes uma questão precisa ser
   * feita para que ocorra uma reavalicao
   */
  private reavaliacaoContagem: number;
  private contadorQuestao: Map<number, number>;
  private readonly logger: Logger;

  constructor(
    private readonly configService: ConfigService,
    private readonly reavaliacaoStrategy: ReavaliacaoStrategy,
    private readonly questaoEstudadaDao: QuestaoEstudadaDao,
  ) {
    this.logger = new Logger(ContadorReavaliacaoQuestao.name);
    this.contadorQuestao = new Map<number, number>();
    this.reavaliacaoContagem =
      Number(this.configService.get<number>('FEAT_REAVALIACAO_CONTAGEM')) || 3;
  }

  precisaReavaliar(idQuestao: number): boolean {
    if (!this.contadorQuestao.has(idQuestao)) {
      this.contadorQuestao.set(idQuestao, 1);
    } else {
      this.contadorQuestao.set(
        idQuestao,
        this.contadorQuestao.get(idQuestao) + 1,
      );
    }
    const contagem = this.contadorQuestao.get(idQuestao);
    if (contagem >= this.reavaliacaoContagem) {
      // para evitar armazenar informacão desnecessária
      this.contadorQuestao.delete(idQuestao);
      this.logger.debug(`Questão ${idQuestao} precisa ser reavaliada`);
      return true;
    }
    this.logger.debug(`Questão ${idQuestao} não precisa ser reavaliada`);
    return false;
  }

  async reavaliarQuestao(
    questao: Pick<IQuestao, 'nivel' | 'id' | 'qualidade'>,
  ) {
    let questoesEstudadas =
      await this.questaoEstudadaDao.recuperarPorQuestaoIdSomenteIdNivelEQualidade(
        {
          data: questao.id,
        },
      );
    questoesEstudadas = questoesEstudadas.filter(
      (qe) => qe.nivel && qe.qualidade,
    );

    if (questoesEstudadas.length === 0) {
      this.logger.debug(
        `Questão ${questao.id} não possui questões estudadas com nivel e qualidade. Não será reavaliada.`,
      );
      return [questao.nivel, questao.qualidade];
    }

    const novoNivel = this.reavaliacaoStrategy.reavaliarNivel(
      questoesEstudadas,
      questao.nivel,
    );

    const novaQualidade = this.reavaliacaoStrategy.reavaliarQualidade(
      questoesEstudadas,
      questao.qualidade,
    );

    this.logger.debug(
      `Questão ${questao.id} possui nivel e qualidade '${questao.nivel}' e '${questao.qualidade}', respectivamente. Após reavaliacao, ` +
        `ficou com nivel e qualidade '${novoNivel}' e '${novaQualidade}', respectivamente.`,
    );

    return [novoNivel, novaQualidade];
  }
}

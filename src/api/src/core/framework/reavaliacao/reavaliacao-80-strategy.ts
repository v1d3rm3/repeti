import { Logger } from '@nestjs/common';
import { Nivel } from '../../models/interface/nivel';
import { Qualidade } from '../../models/interface/qualidade';
import { IQuestaoEstudada } from '../../models/interface/questao-estudada';
import { ReavaliacaoStrategy } from './reavaliacao-strategy';

/**
 * Seleciona um novo nível somente se a quantidade de avaliações
 * do possível novo nivel for maior ou igual a **80% do total de
 * avaliações**.
 *
 * Os parâmetros `questoesEstudadas` referem-se a questão que
 * se deseja reavaliar.
 */
export class Reavaliacao80Strategy extends ReavaliacaoStrategy {
  private logger = new Logger(Reavaliacao80Strategy.name);

  constructor() {
    super();
    this.logger.verbose(
      'Reavaliacao80Strategy foi escolhida ' +
        'como implementação de ReavaliacaoStrategy',
    );
  }

  reavaliarNivel(
    questoesEstudadas: IQuestaoEstudada[],
    nivelAtual: Nivel,
  ): Nivel {
    let novoNivel: Nivel;
    const totalAvaliacoes = questoesEstudadas.length;
    const agrupamentoQtdAvaliacoesPorNivel =
      this._agruparQuantidadeDeAvaliacoesPorNivel(questoesEstudadas);
    agrupamentoQtdAvaliacoesPorNivel.forEach((qtdAvaliacoes, nivel) => {
      const percentual = qtdAvaliacoes / totalAvaliacoes;
      if (percentual >= 0.8) {
        novoNivel = nivel;
      }
    });
    return novoNivel ?? nivelAtual;
  }

  reavaliarQualidade(
    questoesEstudadas: IQuestaoEstudada[],
    qualidadeAtual: Qualidade,
  ): Qualidade {
    let novaQualidade: Qualidade;
    const totalAvaliacoes = questoesEstudadas.length;
    const agrupamentoQtdAvaliacoesPorQualidade =
      this._agruparQuantidadeDeAvaliacoesPorQualidade(questoesEstudadas);
    agrupamentoQtdAvaliacoesPorQualidade.forEach((qtdAvaliacoes, qualidade) => {
      const percentual = qtdAvaliacoes / totalAvaliacoes;
      if (percentual >= 0.8) {
        novaQualidade = qualidade;
      }
    });
    return novaQualidade ?? qualidadeAtual;
  }
}

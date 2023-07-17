import { Logger } from '@nestjs/common';
import { Nivel } from '../../models/interface/nivel';
import { Qualidade } from '../../models/interface/qualidade';
import { IQuestaoEstudada } from '../../models/interface/questao-estudada';
import { ReavaliacaoStrategy } from './reavaliacao-strategy';

/**
 * Seleciona um novo nível para aquele nível que **obteve
 * a maior quantidade de avaliações**.
 *
 * Os parâmetros `questoesEstudadas` referem-se a questão que
 * se deseja reavaliar.
 */
export class ReavaliacaoMaioriaSimplesStrategy extends ReavaliacaoStrategy {
  private logger = new Logger(ReavaliacaoStrategy.name);

  constructor() {
    super();
    this.logger.verbose(
      'ReavaliacaoMaioriaSimplesStrategy foi escolhida ' +
        'como implementação de ReavaliacaoStrategy',
    );
  }

  private _recuperarElementoComMaiorQuantidadeDeAvaliacoes<T>(
    agrupamento: Map<T, number>,
  ): T {
    let elementoComMaiorQuantidadeDeAvaliacoes: T;
    agrupamento.forEach((qtdAvaliacoes, elemento) => {
      if (
        !elementoComMaiorQuantidadeDeAvaliacoes ||
        qtdAvaliacoes > agrupamento.get(elementoComMaiorQuantidadeDeAvaliacoes)
      ) {
        elementoComMaiorQuantidadeDeAvaliacoes = elemento;
      }
    });
    return elementoComMaiorQuantidadeDeAvaliacoes;
  }

  reavaliarNivel(questoesEstudadas: IQuestaoEstudada[]): Nivel {
    const agrupamentoQtdAvaliacoesPorNivel =
      this._agruparQuantidadeDeAvaliacoesPorNivel(questoesEstudadas);

    const novoNivel = this._recuperarElementoComMaiorQuantidadeDeAvaliacoes(
      agrupamentoQtdAvaliacoesPorNivel,
    );

    return novoNivel;
  }

  reavaliarQualidade(questoesEstudadas: IQuestaoEstudada[]): Qualidade {
    const agrupamentoQtdAvaliacoesPorQualidade =
      this._agruparQuantidadeDeAvaliacoesPorQualidade(questoesEstudadas);

    const novoNivel = this._recuperarElementoComMaiorQuantidadeDeAvaliacoes(
      agrupamentoQtdAvaliacoesPorQualidade,
    );
    return novoNivel;
  }
}

import { Logger } from '@nestjs/common';
import { Nivel } from '../../models/interface/nivel';
import { Qualidade } from '../../models/interface/qualidade';
import { IQuestaoEstudada } from '../../models/interface/questao-estudada';
import { ReavaliacaoStrategy } from './reavaliacao-strategy';

/**
 * Apenas para prover alguma implementação. Sem validade efetiva.
 *
 * Os parâmetros `questoesEstudadas` referem-se a questão que
 * se deseja reavaliar.
 */
export class SemReavaliacaoStrategy extends ReavaliacaoStrategy {
  private logger = new Logger(SemReavaliacaoStrategy.name);

  constructor() {
    super();
    this.logger.verbose(
      'SemReavaliacaoStrategy foi escolhida ' +
        'como implementação de ReavaliacaoStrategy',
    );
  }

  reavaliarNivel(
    questoesEstudadas: IQuestaoEstudada[],
    nivelAtual: Nivel,
  ): Nivel {
    return nivelAtual;
  }
  reavaliarQualidade(
    questoesEstudadas: IQuestaoEstudada[],
    qualidadeAtual: Qualidade,
  ): Qualidade {
    return qualidadeAtual;
  }
}

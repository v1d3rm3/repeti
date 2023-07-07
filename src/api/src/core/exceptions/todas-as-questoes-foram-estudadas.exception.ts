import { BadRequestException } from '@nestjs/common';

/**
 * Indica que todas as questões dentro de um estudo
 * já foram estudadas.
 */
export class TodasAsQuestoesForamEstudadasException extends BadRequestException {
  constructor() {
    super({
      codigo: 'TODAS_AS_QUESTOES_FORAM_ESTUDADAS',
      mensagem: 'Todas as questões do estudo já foram estudadas',
    });
  }
}

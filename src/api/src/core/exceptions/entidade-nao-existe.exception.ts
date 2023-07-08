import { BadRequestException } from '@nestjs/common';

/**
 * Exceção lançada quando uma entidade (questao, alternativa, estudo, ...) não existe
 */
export class EntidadeNaoExisteException extends BadRequestException {
  constructor(entidade: string, contexto: string) {
    super({
      codigo: 'ENTIDADE_NAO_EXISTE',
      mensagem: `O objeto [${entidade}] solicitado não existe [contexto: ${contexto}]`,
    });
  }
}

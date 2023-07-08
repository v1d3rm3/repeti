import { BadRequestException } from '@nestjs/common';

export class QuestaoJaFoiAvaliadaException extends BadRequestException {
  constructor(contexto: string) {
    super({
      codigo: 'QUESTA_JA_FOI_AVALIADA',
      mensagem: `A questão já foi avaliada [contexto: ${contexto}]`,
    });
  }
}

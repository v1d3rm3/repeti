import { BadRequestException } from '@nestjs/common';

export class QuestaoJaFoiRespondidaException extends BadRequestException {
  constructor(contexto: string) {
    super({
      codigo: 'QUESTAO_JA_FOI_RESPONDIDA',
      mensagem: `A questão já foi respondida [contexto: ${contexto}]`,
    });
  }
}

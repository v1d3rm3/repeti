import { BadRequestException } from '@nestjs/common';

export class AlternativaNaoFazParteDeQuestaoException extends BadRequestException {
  constructor(contexto: string) {
    super({
      codigo: 'ALTERNATIVA_NAO_FAZ_PARTE_DE_QUESTAO',
      mensagem: `A alternativa solicitada não faz parte da questão [contexto: ${contexto}]`,
    });
  }
}

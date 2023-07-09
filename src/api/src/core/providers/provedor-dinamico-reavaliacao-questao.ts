import { Provider } from '@nestjs/common';
import { Reavaliacao50Strategy } from '../framework/reavaliacao/reavaliacao-50-strategy';
import { Reavaliacao80Strategy } from '../framework/reavaliacao/reavaliacao-80-strategy';
import { ReavaliacaoMaioriaSimplesStrategy } from '../framework/reavaliacao/reavaliacao-maioria-simples';
import { SemReavaliacaoStrategy } from '../framework/reavaliacao/sem-reavaliacao-strategy';

function recuperarInstancia() {
  const featReavaliacaoQuestao = process.env.FEAT_REAVALIACAO_QUESTAO;
  if (featReavaliacaoQuestao === 'nenhuma') {
    return SemReavaliacaoStrategy;
  } else if (featReavaliacaoQuestao === 'reavaliacao-50') {
    return Reavaliacao50Strategy;
  } else if (featReavaliacaoQuestao === 'reavaliacao-80') {
    return Reavaliacao80Strategy;
  } else if (featReavaliacaoQuestao === 'maioria-simples') {
    return ReavaliacaoMaioriaSimplesStrategy;
  } else {
    throw new Error(
      `[Funcionalidade de Reavaliação] Modalidade '${featReavaliacaoQuestao}' não implementada`,
    );
  }
}

export function ProvedorDinamicoReavaliacaoQuestao(token): Provider[] {
  const instancia = recuperarInstancia();
  return [
    instancia,
    {
      provide: token,
      useExisting: instancia,
    },
  ];
}

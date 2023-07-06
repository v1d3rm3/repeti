import { Provider } from '@nestjs/common';
import { ProximaQuestaoAleatoriaTemplateMethod } from 'src/estudo/framework/proxima-questao-aleatoria-template-method';
import { ProximaQuestaoTemplateMethod } from 'src/estudo/framework/proxima-questao-template-method';

function recuperarInstancia() {
  const featProximaQuestao = process.env.FEAT_PROXIMA_QUESTAO;
  if (process.env.FEAT_PROXIMA_QUESTAO === 'aleatorio') {
    return ProximaQuestaoAleatoriaTemplateMethod;
  } else if (process.env.FEAT_PROXIMA_QUESTAO === '') {
    return ProximaQuestaoAleatoriaTemplateMethod;
  } else if (process.env.FEAT_PROXIMA_QUESTAO === '') {
    return ProximaQuestaoAleatoriaTemplateMethod;
  } else {
    throw new Error(`Modalidade '${featProximaQuestao}' não implementada`);
  }
}

export function ProvedorDinamicoProximaQuestao(token): Provider[] {
  const instancia = recuperarInstancia();
  return [
    instancia,
    {
      provide: token,
      useExisting: instancia,
    },
  ];
}

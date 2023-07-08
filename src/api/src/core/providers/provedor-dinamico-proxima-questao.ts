import { Provider } from '@nestjs/common';
import { ProximaQuestaoAleatoriaTemplateMethod } from 'src/estudo/framework/proxima-questao-aleatoria-template-method';
import { ProximaQuestaoPorNivelEQualidadeTemplateMethod } from '../../estudo/framework/proxima-questao-por-nivel-e-qualidade-template-method';
import { ProximaQuestaoPorNivelTemplateMethod } from '../../estudo/framework/proxima-questao-por-nivel-template-method';

function recuperarInstancia() {
  const featProximaQuestao = process.env.FEAT_PROXIMA_QUESTAO;
  if (process.env.FEAT_PROXIMA_QUESTAO === 'aleatorio') {
    return ProximaQuestaoAleatoriaTemplateMethod;
  } else if (process.env.FEAT_PROXIMA_QUESTAO === 'por-nivel') {
    return ProximaQuestaoPorNivelTemplateMethod;
  } else if (process.env.FEAT_PROXIMA_QUESTAO === 'por-nivel-e-qualidade') {
    return ProximaQuestaoPorNivelEQualidadeTemplateMethod;
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

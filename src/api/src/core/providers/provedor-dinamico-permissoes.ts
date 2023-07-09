import { Provider } from '@nestjs/common';
import { ProximaQuestaoAleatoriaTemplateMethod } from 'src/estudo/framework/proxima-questao-aleatoria-template-method';
import { ProximaQuestaoPorNivelTemplateMethod } from '../../estudo/framework/proxima-questao-por-nivel-template-method';

function recuperarInstancia() {
  const featPermissoesGrupo = process.env.FEAT_PERMISSOES_GRUPO;
  if (featPermissoesGrupo === 'aleatorio') {
    return ProximaQuestaoAleatoriaTemplateMethod;
  } else if (featPermissoesGrupo === 'por-nivel') {
    return ProximaQuestaoPorNivelTemplateMethod;
  } else {
    throw new Error(`Modalidade '${featPermissoesGrupo}' não implementada`);
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

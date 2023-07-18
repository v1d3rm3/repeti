import { Provider } from '@nestjs/common';
import { BloqueioPorGrupoStrategy } from '../framework/permissoes-grupo/bloqueio-por-grupo-strategy';
import { SemBloqueioStrategy } from '../framework/permissoes-grupo/sem-bloqueio-strategy';

function recuperarInstancia() {
  const featPermissoesGrupo = process.env.FEAT_PERMISSOES_GRUPO;
  if (featPermissoesGrupo === 'nenhum') {
    return SemBloqueioStrategy;
  } else if (featPermissoesGrupo === 'categoria-grupo') {
    return BloqueioPorGrupoStrategy;
  } else {
    throw new Error(`Modalidade '${featPermissoesGrupo}' não implementada`);
  }
}

export function ProvedorDinamicoPermissoesGrupo(token): Provider[] {
  const instancia = recuperarInstancia();
  return [
    instancia,
    {
      provide: token,
      useExisting: instancia,
    },
  ];
}

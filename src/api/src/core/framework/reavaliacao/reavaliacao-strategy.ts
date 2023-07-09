import { Injectable } from '@nestjs/common';
import { Nivel } from '../../models/interface/nivel';
import { Qualidade } from '../../models/interface/qualidade';
import { IQuestaoEstudada } from '../../models/interface/questao-estudada';

/**
 * Permite a reavaliação do nível e qualidade
 * de uma questão por algum critério específico.
 */
@Injectable()
export abstract class ReavaliacaoStrategy {
  abstract reavaliarNivel(
    questoesEstudadas: IQuestaoEstudada[],
    nivelAtual: Nivel,
  ): Nivel;
  abstract reavaliarQualidade(
    questoesEstudadas: IQuestaoEstudada[],
    qualidadeAtual: Qualidade,
  ): Qualidade;

  protected _agruparQuantidadeDeAvaliacoesPorNivel(
    questoesEstudadas: IQuestaoEstudada[],
  ): Map<Nivel, number> {
    const map = new Map<Nivel, number>();
    for (const questaoEstudada of questoesEstudadas) {
      const nivel = questaoEstudada.nivel;
      const quantidade = map.get(nivel) || 0;
      map.set(nivel, quantidade + 1);
    }
    return map;
  }

  protected _agruparQuantidadeDeAvaliacoesPorQualidade(
    questoesEstudadas: IQuestaoEstudada[],
  ): Map<Qualidade, number> {
    const map = new Map<Qualidade, number>();
    for (const questaoEstudada of questoesEstudadas) {
      const qualidade = questaoEstudada.qualidade;
      const quantidade = map.get(qualidade) || 0;
      map.set(qualidade, quantidade + 1);
    }
    return map;
  }
}

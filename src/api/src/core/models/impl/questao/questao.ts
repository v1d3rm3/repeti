import { IAlternativa } from '../../interface/alternativa';
import { Nivel } from '../../interface/nivel';
import { Qualidade } from '../../interface/qualidade';
import { IQuestao } from '../../interface/questao';

export class QuestaoImpl implements IQuestao {
  id: number;
  nivel: Nivel;
  qualidade: Qualidade;
  elaboradorId: number;
  categoriaId: number;
  enunciado: string;
  alternativas?: IAlternativa[];
}

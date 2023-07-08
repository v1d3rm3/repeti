import { IAlternativa } from '../../interface/alternativa';
import { IEstudo } from '../../interface/estudo';
import { Nivel } from '../../interface/nivel';
import { Qualidade } from '../../interface/qualidade';
import { IQuestaoEstudada } from '../../interface/questao-estudada';
import { IUsuario } from '../../interface/usuario';

export class QuestaoEstudadaImpl implements IQuestaoEstudada {
  acertou: boolean;
  nivel: Nivel;
  qualidade: Qualidade;
  alternativaId: number;
  alternativa?: IAlternativa;
  estudanteId: number;
  estudante?: IUsuario;
  estudoId: number;
  estudo?: IEstudo;
  id: number;
}

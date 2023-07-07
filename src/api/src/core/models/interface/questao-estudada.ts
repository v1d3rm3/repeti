import { QuestaoEstudada } from '@prisma/client';
import { IAlternativa } from './alternativa';
import { IEstudo } from './estudo';
import { Nivel } from './nivel';
import { Qualidade } from './qualidade';
import { IUsuario } from './usuario';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IQuestaoEstudada extends Pick<QuestaoEstudada, 'id'> {
  nivel: Nivel;
  qualidade: Qualidade;
  alternativaId: number;
  alternativa?: IAlternativa;
  estudanteId: number;
  estudante?: IUsuario;
  estudoId: number;
  estudo?: IEstudo;
}

import { Nivel } from '../../interface/nivel';
import { Qualidade } from '../../interface/qualidade';

export type EstudoAvaliarQuestaoReq = {
  questaoEstudadaId: number;
  nivel: Nivel;
  qualidade: Qualidade;
};

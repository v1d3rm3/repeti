import { Injectable } from '@nestjs/common';
import { IEstudo } from '../../core/models/interface/estudo';
import { IQuestao } from '../../core/models/interface/questao';
import { MysqlService } from '../../core/mysql/mysql.service';
import { QuestaoDao } from '../../dal/questao-dao';
import { ProximaQuestaoTemplateMethod } from './proxima-questao-template-method';

/**
 * Seleciona as próximas questões de maneira aleatória,
 * sem se preocupar com nenhum tipo de filtro específico.
 */
@Injectable()
export class ProximaQuestaoAleatoriaTemplateMethod
  implements ProximaQuestaoTemplateMethod
{
  constructor(
    private readonly mysqlService: MysqlService,
    private readonly questaoDao: QuestaoDao,
  ) {}

  proximaQuestao(estudo: IEstudo) {
    const questoes = this.recuperarConjuntoDeQuestoes(estudo);
  }

  recuperarConjuntoDeQuestoes(estudo: IEstudo): IQuestao[] {
    estudo.categoria.id;
    // 1. selecionar todos os ids das possiveis questoes
    // 2. selecionar todas as questoes que foram feitas
    // pelo usuario, nesse estudo
    // 3. fazer a diferenca entre esses dois conjuntos
    // 4. retornar o resultad

    return null;
  }

  selecionarQuestao(conjuntoDeQuestoes: IQuestao[]) {
    throw new Error('Method not implemented.');
  }
}

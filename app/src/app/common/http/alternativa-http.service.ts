import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { IRecuperarQuestaoResponse } from '../dto/recuperar-questao-response';
import { IAlternativa } from '../models/alternativa';
import { IQuestao } from '../models/questao';

@Injectable({ providedIn: 'root' })
export class AlternativaHttpService {
  constructor(private _http: HttpClient) {}

  atualizar(id: number, alternativa: string) {
    return this._http.patch<{ id: number; alternativa: string }>(
      `${environment.apiURL}/alternativa/${id}`,
      {
        alternativa,
      }
    );
  }

  criar(questaoId: number, alternativa: string) {
    return this._http.post<IAlternativa>(`${environment.apiURL}/alternativa`, {
      questaoId,
      alternativa,
    });
  }

  recuperarPorQuestaoId(questaoId: number) {
    return this._http.get<IAlternativa[]>(
      `${environment.apiURL}/alternativa/questao/${questaoId}`
    );
  }

  remover(alternativaId: number) {
    return this._http.delete(
      `${environment.apiURL}/alternativa/${alternativaId}`
    );
  }
}

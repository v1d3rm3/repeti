import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { IRecuperarQuestaoResponse } from '../dto/recuperar-questao-response';
import { IQuestao } from '../models/questao';

@Injectable({ providedIn: 'root' })
export class QuestaoHttpService {
  constructor(private _http: HttpClient) {}

  recuperar() {
    return this._http.get<IRecuperarQuestaoResponse[]>(
      `${environment.apiURL}/questoes`
    );
  }

  recuperarPorId(id: number) {
    return this._http.get<IRecuperarQuestaoResponse>(
      `${environment.apiURL}/questoes/${id}`
    );
  }

  criar(enunciado: string) {
    return this._http.post<IQuestao>(`${environment.apiURL}/questoes`, {
      enunciado,
    });
  }

  atualizar(id: number, enunciado: string) {
    return this._http.patch(`${environment.apiURL}/questoes/${id}`, {
      enunciado,
    });
  }

  remover(id: number) {
    return this._http.delete(`${environment.apiURL}/questoes/${id}`)
  }

  definirCategoria(questaoId: number, categoriaId: number) {
    return this._http.put<void>(
      `${environment.apiURL}/questoes/${questaoId}/categoria/${categoriaId}`,
      {}
    );
  }

  definirReposta(questaoId: number, alternativaId: number) {
    return this._http.put<void>(
      `${environment.apiURL}/questoes/${questaoId}/resposta`,
      {
        id: alternativaId,
      }
    );
  }
}

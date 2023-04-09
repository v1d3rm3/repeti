import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { IAtualizarProvaParams } from '../dto/atualizar-prova-params';
import { IListarProvaResponseDto } from '../dto/listar-prova-response.dto';

@Injectable({
  providedIn: 'root',
})
export class ProvaHttpService {
  constructor(private _http: HttpClient) {}

  recuperar() {
    return this._http.get<IListarProvaResponseDto[]>(
      `${environment.apiURL}/prova`
    );
  }

  recuperarPorId(id: number) {
    return this._http.get<IListarProvaResponseDto>(
      `${environment.apiURL}/prova/${id}`
    );
  }

  criar(nome: string) {
    return this._http.post<void>(`${environment.apiURL}/prova`, {
      nome,
    });
  }

  adicionarQuestao(provaId: number, questaoId: number) {
    return this._http.post<void>(
      `${environment.apiURL}/prova/${provaId}/questao`,
      {
        questaoId,
      }
    );
  }

  atualizar(params: IAtualizarProvaParams) {
    return this._http.patch<void>(`${environment.apiURL}/prova`, params);
  }

  excluir(id: number) {
    return this._http.delete<void>(`${environment.apiURL}/prova/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { IAtualizarListaDeEstudoParams } from '../dto/atualizar-lista-de-estudo-params';
import { IListarListaDeEstudoResponseDto } from '../dto/listar-lista-de-estudo-response.dto';

@Injectable({
  providedIn: 'root',
})
export class ListaDeEstudoHttpService {
  constructor(private _http: HttpClient) {}

  recuperar() {
    return this._http.get<IListarListaDeEstudoResponseDto[]>(
      `${environment.apiURL}/lista-de-estudos`
    );
  }

  recuperarPorId(id: number) {
    return this._http.get<IListarListaDeEstudoResponseDto>(
      `${environment.apiURL}/lista-de-estudos/${id}`
    );
  }

  criar(nome: string) {
    return this._http.post<void>(`${environment.apiURL}/lista-de-estudos`, {
      nome,
    });
  }

  adicionarQuestao(listaDeEstudoId: number, questaoId: number) {
    return this._http.post<void>(
      `${environment.apiURL}/lista-de-estudos/${listaDeEstudoId}/questao`,
      {
        questaoId,
      }
    );
  }

  atualizar(params: IAtualizarListaDeEstudoParams) {
    return this._http.patch<void>(
      `${environment.apiURL}/lista-de-estudo`,
      params
    );
  }

  excluir(id: number) {
    return this._http.delete<void>(
      `${environment.apiURL}/lista-de-estudo/${id}`
    );
  }
}

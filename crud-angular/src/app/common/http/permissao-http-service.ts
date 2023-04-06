import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { IAtualizarPermissaoParams } from '../dto/atualizar-permissao-params.js';
import { IListarPermissaoResponseDto } from '../dto/listar-permissao-response.dto.js';

@Injectable({
  providedIn: 'root',
})
export class PermissaoHttpService {
  constructor(private _http: HttpClient) {}

  recuperar(): Observable<IListarPermissaoResponseDto[]> {
    return this._http.get<IListarPermissaoResponseDto[]>(
      `${environment.apiURL}/permissoes`
    );
  }

  criar(nome: string) {
    return this._http.post<void>(`${environment.apiURL}/permissoes`, {
      nome,
    });
  }

  atualizar(params: IAtualizarPermissaoParams) {
    return this._http.put<void>(`${environment.apiURL}/permissoes`, params);
  }

  excluir(id: number) {
    return this._http.delete<void>(`${environment.apiURL}/permissoes/${id}`);
  }
}

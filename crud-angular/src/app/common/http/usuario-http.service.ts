import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { IAtualizarPermissaoParams } from '../dto/atualizar-permissao-params';
import { IListarUsuarioResponseDto } from '../dto/listar-usuario-response.dto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioHttpService {
  constructor(private _http: HttpClient) {}

  recuperar(): Observable<IListarUsuarioResponseDto[]> {
    return this._http.get<IListarUsuarioResponseDto[]>(
      `${environment.apiURL}/usuarios`
    );
  }

  recuperarPorId(id: number): Observable<IListarUsuarioResponseDto> {
    return this._http.get<IListarUsuarioResponseDto>(
      `${environment.apiURL}/usuarios/${id}`
    );
  }

  excluir(id: number) {
    return this._http.delete<void>(`${environment.apiURL}/usuarios/${id}`);
  }

  atualizarPermissao(id: number, permissao: string) {
    return this._http.post<void>(
      `${environment.apiURL}/usuarios/${id}/permissoes`,
      {
        nomePermissao: permissao,
      }
    );
  }
}

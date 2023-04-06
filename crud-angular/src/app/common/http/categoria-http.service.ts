import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { IAtualizarCateogoriaParams } from '../dto/atualizar-categoria-params';
import { ICategoria } from '../models/categoria';

@Injectable({ providedIn: 'root' })
export class CategoriaHttpService {
  constructor(private _http: HttpClient) {}

  recuperar() {
    return this._http.get<ICategoria[]>(`${environment.apiURL}/categorias`);
  }

  criar(categoria: string) {
    return this._http.post<void>(`${environment.apiURL}/categorias`, {
      categoria,
    });
  }

  recuperarPorId(id: number) {
    return this._http.get<ICategoria>(
      `${environment.apiURL}/categorias/${id}`
    );
  }

  atualizar(params: IAtualizarCateogoriaParams) {
    return this._http.put<void>(`${environment.apiURL}/categorias/${params.id}`, params);
  }

  excluir(id: number) {
    return this._http.delete<void>(`${environment.apiURL}/categorias/${id}`);
  }


}

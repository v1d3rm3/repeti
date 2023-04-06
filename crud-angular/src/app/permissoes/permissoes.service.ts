import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Permissoes } from './permissoes';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class PermissoesService {
  constructor(private http: HttpClient) {}

  todasAsPermissoes(): Observable<Permissoes> {
    return this.http.get<Permissoes>(`${API}/permissoes`);
  }
}

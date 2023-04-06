import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { NovoUsuario } from './NovoUsuario';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  constructor(private http: HttpClient) { }

  cadastrarNovoUsuario(usuario: NovoUsuario) {
    return this.http.post(`${API}/usuarios`, usuario);
  }

  cadastrarPermissoes(usuario: NovoUsuario) {
    return this.http.post(`${API}/usuarios/${usuario.email}/email/permissao`, {});
  }
}

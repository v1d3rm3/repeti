import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import {
  IAutenticarResponseDto,
  IUsuarioAutenticadoInfoResponseDto,
} from './interfaces';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  constructor(private httpClient: HttpClient) {}

  autenticar(email: string, senha: string) {
    return this.httpClient.post<IAutenticarResponseDto>(
      `${API}/usuarios/auth`,
      {
        email: email,
        senha: senha,
      }
    );
  }

  recuperarInfo() {
    return this.httpClient.get<IUsuarioAutenticadoInfoResponseDto>(
      `${API}/usuarios/info`
    );
  }
}

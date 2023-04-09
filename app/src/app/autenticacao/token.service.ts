import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  getToken() {
    return localStorage.getItem(KEY) ?? '';
  }

  salvarToken(token: string) {
    localStorage.setItem(KEY, token);
  }

  excluirToken() {
    localStorage.removeItem(KEY);
  }

  possuiToken() {
    return !!this.getToken();
  }
}

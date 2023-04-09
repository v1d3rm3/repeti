import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { SessaoUsuarioService } from '../autenticacao/sessao-usuario.service';

@Injectable({
  providedIn: 'root',
})
export class SessaoAtivaGuard implements CanActivate, CanLoad {
  constructor(
    private _router: Router,
    private _sessaoUsuarioService: SessaoUsuarioService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.estaLogado();
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.estaLogado();
  }

  estaLogado() {
    if (this._sessaoUsuarioService.estaLogado()) {
      this._router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SessaoUsuarioService } from './sessao-usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoGuard implements CanActivate, CanLoad {
  constructor(
    private _sessaoUsuarioService: SessaoUsuarioService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this._sessaoUsuarioService.estaLogado()) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }

  canLoad(route: Route) {
    if (!this._sessaoUsuarioService.estaLogado()) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}

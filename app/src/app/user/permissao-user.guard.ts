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
import { AutorizacaoService } from '../autenticacao/autorizacao.service';
import { UsuarioPapel } from '../autenticacao/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PermissaoUserGuard implements CanActivate, CanLoad {
  constructor(
    private _autorizacaoService: AutorizacaoService,
    private _router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.temAutorizacaoDeUser();
  }
  canLoad(route: Route, segments: UrlSegment[]) {
    return this.temAutorizacaoDeUser();
  }

  temAutorizacaoDeUser() {
    if (this._autorizacaoService.temPapel(UsuarioPapel.Usuario)) {
      return true;
    } else {
      this._router.navigate(['/user/sem-autorizacao']);
      return false;
    }
  }
}

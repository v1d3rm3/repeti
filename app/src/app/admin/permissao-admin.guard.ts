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
export class PermissaoAdminGuard implements CanActivate, CanLoad {
  constructor(
    private _autorizacaoService: AutorizacaoService,
    private _router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.temAutorizacaoDeAdmin();
  }
  canLoad(route: Route, segments: UrlSegment[]) {
    return this.temAutorizacaoDeAdmin();
  }

  temAutorizacaoDeAdmin() {
    if (this._autorizacaoService.temPapel(UsuarioPapel.Administrador)) {
      return true;
    } else {
      this._router.navigate(['/admin/sem-autorizacao']);
      return false;
    }
  }
}

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { tap } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { AutenticacaoService } from './autenticacao/autenticacao.service';
import { SessaoUsuarioService } from './autenticacao/sessao-usuario.service';
import { TokenService } from './autenticacao/token.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

function verificacaoDeSessaoAtiva(
  sessaoUsuarioService: SessaoUsuarioService,
  tokenService: TokenService,
  autenticacaoService: AutenticacaoService
) {
  return () => {
    return new Promise<void>((resolve, _) => {
      if (tokenService.possuiToken()) {
        autenticacaoService
          .recuperarInfo()
          .pipe(tap((sessao) => sessaoUsuarioService.atualizarSessao(sessao)))
          .subscribe({
            next: () => resolve(),
            error: () => resolve(),
          });
      } else {
        resolve();
      }
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    AutenticacaoModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: verificacaoDeSessaoAtiva,
      deps: [SessaoUsuarioService, TokenService, AutenticacaoService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

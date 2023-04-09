import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { SessaoUsuarioService } from '../../../autenticacao/sessao-usuario.service';
import { IListarProvaResponseDto } from '../../../common/dto/listar-prova-response.dto';
import { ProvaHttpService } from '../../../common/http/prova-http.service';

@Component({
  selector: 'app-prova-listar',
  templateUrl: './prova-listar.component.html',
  styleUrls: ['./prova-listar.component.scss'],
})
export class ProvaListarComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['nome', 'acoes'];
  provasDataSource: IListarProvaResponseDto[] = [];

  constructor(
    private _sessaoUsuarioService: SessaoUsuarioService,
    private _provaHttpService: ProvaHttpService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {
    this._subscriptions.forEach(el => el.unsubscribe());
  }

  ngOnInit() {
    this._carregarProvas();
  }

  private _carregarProvas() {
    const sub = this._provaHttpService
      .recuperar()
      .subscribe((res) => (this.provasDataSource = res));
    this._subscriptions.push(sub);
  }

  excluir(el: IListarProvaResponseDto) {
    this._provaHttpService.excluir(el.id).subscribe({
      next: () => {
        this._carregarProvas();
        this._snackBar.open('Prova excluída com sucesso', 'Fechar', {
          duration: 3500,
        });
      },
      error: () => {
        this._snackBar.open('Não foi possível excluír esta prova', 'Fechar', {
          duration: 3500,
        });
      },
    });
  }
}

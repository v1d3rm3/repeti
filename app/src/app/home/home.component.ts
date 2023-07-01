import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessaoUsuarioService } from '../autenticacao/sessao-usuario.service';
import { QuestaoHttpService } from '../common/http/questao-http.service';
import { IQuestao } from '../common/models/questao';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  estaLogado: boolean = false;
  questoes$!: Observable<IQuestao[]>;

  constructor(
    private _questaoHttpService: QuestaoHttpService,
    private _sessaoUsuarioService: SessaoUsuarioService
  ) {
    this.estaLogado = this._sessaoUsuarioService.estaLogado();
  }

  ngOnInit() {
    if (this._sessaoUsuarioService.estaLogado()) {
      this.questoes$ = this._questaoHttpService.recuperar();
    }
  }
}

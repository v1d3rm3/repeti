import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessaoUsuarioService } from '../autenticacao/sessao-usuario.service';
import { IRecuperarQuestaoResponse } from '../common/dto/recuperar-questao-response';
import { QuestaoHttpService } from '../common/http/questao-http.service';
import { IQuestao } from '../common/models/questao';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  questoes$!: Observable<IQuestao[]>;

  constructor(
    private _questaoHttpService: QuestaoHttpService,
    private _sessaoUsuarioService: SessaoUsuarioService
  ) {}

  ngOnInit() {
    if (this._sessaoUsuarioService.estaLogado()) {
      this.questoes$ = this._questaoHttpService.recuperar();
    }
  }
}

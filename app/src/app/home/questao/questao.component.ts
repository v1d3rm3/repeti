import { Component, Input, OnInit } from '@angular/core';
import { filter, first, from, of } from 'rxjs';
import { AlternativaHttpService } from '../../common/http/alternativa-http.service';
import { IAlternativa } from '../../common/models/alternativa';
import { IQuestao } from '../../common/models/questao';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.scss'],
})
export class QuestaoComponent implements OnInit {
  @Input()
  questao?: IQuestao;

  resposta: number = -1;

  alternativas: IAlternativa[] = [];

  constructor(private _alternativaHttpService: AlternativaHttpService) {}

  ngOnInit(): void {
    this._alternativaHttpService
      .recuperarPorQuestaoId(this.questao?.id!)
      .subscribe((alts) => {
        this.alternativas = alts;
      });
  }

  responder() {
    from(this.alternativas)
      .pipe(
        filter((a) => a.id === this.resposta),
        first()
      )
      .subscribe((r) => {
        console.log(r);
        if (this.questao?.resposta.id === r.id) {
          alert('ACERTOU');
        } else {
          alert('ERROU');
        }
      });
  }
}

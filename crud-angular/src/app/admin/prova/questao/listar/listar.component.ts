import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { QuestaoHttpService } from 'src/app/common/http/questao-http.service';
import { ProvaHttpService } from '../../../../common/http/prova-http.service';
import { IProva } from '../../../../common/models/prova';
import { IQuestao } from '../../../../common/models/questao';

@Component({
  selector: 'app-questao-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class QuestaoListarComponent implements OnInit {
  private _provaId: number | undefined;
  questoes: IQuestao[] = [];
  prova: IProva | undefined;
  displayedColumns: string[] = ['nome', 'acoes'];

  constructor(
    private _questaoHttpService: QuestaoHttpService,
    private _provaHttpService: ProvaHttpService,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._route.params
      .pipe(
        map((res) => res['id']),
        tap((provaId) => (this._provaId = provaId))
      )
      .subscribe(() => {
        this._carregarQuestoes();
      });
  }

  excluir(id: number) {
    this._questaoHttpService.remover(id).subscribe({
      next: () => {
        this._carregarQuestoes();
        this._snackBar.open('Questão removida com sucesso', 'Fechar', {
          duration: 3500,
        });
      }
    })
  }

  private _carregarQuestoes() {
    if (this._provaId) {
      const sub = this._provaHttpService
        .recuperarPorId(this._provaId)
        .subscribe((res) => {
          this.prova = {
            id: res.id,
            nome: res.nomeProva,
            questoes: res.questoes,
          };
          this.questoes = res.questoes;
        });
    }
  }
}

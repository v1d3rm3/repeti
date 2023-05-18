import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestaoHttpService } from 'src/app/common/http/questao-http.service';
import { ProvaHttpService } from './../../../common/http/prova-http.service';
import { IQuestao } from './../../../common/models/questao';

@Component({
  selector: 'app-questao-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class QuestaoListarComponent implements OnInit {
  questoes: IQuestao[] = [];
  displayedColumns: string[] = ['nome', 'acoes'];

  constructor(
    private _questaoHttpService: QuestaoHttpService,
    private _provaHttpService: ProvaHttpService,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._carregarQuestoes();
  }

  excluir(id: number) {
    this._questaoHttpService.remover(id).subscribe({
      next: () => {
        this._carregarQuestoes();
        this._snackBar.open('Questão removida com sucesso', 'Fechar', {
          duration: 3500,
        });
      },
    });
  }

  private _carregarQuestoes() {
    const sub = this._questaoHttpService.recuperar().subscribe((res) => {
      console.log(res);
      this.questoes = res;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, switchMap, tap } from 'rxjs';
import { AlternativaHttpService } from '../../../../common/http/alternativa-http.service';
import { CategoriaHttpService } from '../../../../common/http/categoria-http.service';
import { ProvaHttpService } from '../../../../common/http/prova-http.service';
import { QuestaoHttpService } from '../../../../common/http/questao-http.service';
import { IAlternativa } from '../../../../common/models/alternativa';
import { ICategoria } from '../../../../common/models/categoria';
import { IProva } from '../../../../common/models/prova';
import { IQuestao } from '../../../../common/models/questao';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss'],
})
export class CadastrarQuestaoComponent implements OnInit {
  private _provaId?: number;
  prova?: IProva;
  categorias?: ICategoria[];
  form: FormGroup;

  public get alternativasFormArray(): FormArray {
    return this.form.get('alternativas') as FormArray;
  }

  constructor(
    private _fb: FormBuilder,
    private _provaHttpService: ProvaHttpService,
    private _questaoHttpService: QuestaoHttpService,
    private _categoriaHttpService: CategoriaHttpService,
    private _alternativaHttpService: AlternativaHttpService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.form = _fb.group({
      enunciado: [null, Validators.required],
      categoria: [null, Validators.required],
      alternativas: _fb.array([this._criarAlternativaFormGroup()]),
      resposta: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this._categoriaHttpService
      .recuperar()
      .subscribe((res) => (this.categorias = res));

    this._route.params.subscribe((params) => {
      this._provaId = params['id'];
      this._carregarProva();
    });
  }

  private _carregarProva() {
    this._provaHttpService.recuperarPorId(this._provaId!).subscribe(
      (res) =>
        (this.prova = {
          id: res.id,
          nome: res.nomeProva,
          questoes: res.questoes,
        })
    );
  }

  cadastrar() {
    let questao: IQuestao;

    this._questaoHttpService
      .criar(this.form.get('enunciado')?.value)
      .pipe(
        tap((q) => (questao = q)),
        switchMap((questao) =>
          this._provaHttpService.adicionarQuestao(this._provaId!, questao.id)
        ),
        // adicionando categoria
        switchMap((_q) =>
          this._questaoHttpService.definirCategoria(
            questao.id,
            this.form.get('categoria')?.value
          )
        ),
        switchMap(() => {
          let i: number = 0;
          const obj: { [i: number]: Observable<IAlternativa> } = {};
          this.alternativasFormArray.controls.forEach((c) => {
            const a = c.get('alternativa')?.value;
            obj[i++] = this._alternativaHttpService.criar(questao.id, a);
          });
          return forkJoin(obj);
        }),
        switchMap((res) => {
          const r = this.form.get('resposta')?.value;
          return this._questaoHttpService.definirReposta(
            questao.id,
            res[r]?.id
          );
        })
      )
      .subscribe({
        next: (res) => {
          this._snackBar.open('Questão cadastrada com sucesso', 'Fechar', {
            duration: 3500,
          });
          this._router.navigate(['../'], { relativeTo: this._route });
        },
      });
  }

  adicionarAlternativa() {
    this.alternativasFormArray.push(this._criarAlternativaFormGroup());
  }

  removerAlternativa() {
    this.alternativasFormArray.removeAt(
      this.alternativasFormArray.controls.length - 1
    );
  }

  private _criarAlternativaFormGroup() {
    return this._fb.group({
      id: [null],
      alternativa: [null, Validators.required],
    });
  }
}

import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { AlternativaHttpService } from '../../../../common/http/alternativa-http.service';
import { CategoriaHttpService } from '../../../../common/http/categoria-http.service';
import { ProvaHttpService } from '../../../../common/http/prova-http.service';
import { QuestaoHttpService } from '../../../../common/http/questao-http.service';
import { IAlternativa } from '../../../../common/models/alternativa';
import { ICategoria } from '../../../../common/models/categoria';
import { IProva } from '../../../../common/models/prova';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarQuestaoComponent {
  private _provaId?: number;
  private _questaoId?: number;
  prova?: IProva;
  categorias?: ICategoria[];
  form: FormGroup;
  alternativas?: IAlternativa[];
  repostaAlternativaId?: number;

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
      id: [null, Validators.required],
      enunciado: [null, Validators.required],
      categoria: [null, Validators.required],
      alternativas: _fb.array([]),
      resposta: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this._categoriaHttpService
      .recuperar()
      .subscribe((res) => (this.categorias = res));

    this._route.params.subscribe((params) => {
      this._provaId = params['id'];
      this._questaoId = params['questao_id'];
      this._carregarProva();
      this._carregarQuestao();
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

  private _carregarQuestao() {
    this._questaoHttpService
      .recuperarPorId(this._questaoId!)
      .subscribe((res) => {
        this.form.get('id')?.patchValue(res.id);
        this.form.get('enunciado')?.patchValue(res.enunciado);
        this.form.get('categoria')?.patchValue((res as any).categoria.id);
        this.repostaAlternativaId = (res as any).resposta.id;
        console.log(res);
        this._carregarAlternativas();
      });
  }

  private _carregarAlternativas() {
    this._alternativaHttpService
      .recuperarPorQuestaoId(this._questaoId!)
      .subscribe((res) => {
        // preenchendo formulário
        res.forEach((r) => {
          const c = this._criarAlternativaFormGroup();
          c.patchValue(r as any);
          (this.form.get('alternativas') as FormArray).push(c);
        });

        // definir resposta
        this.alternativasFormArray.controls.forEach((a, i) => {
          if (a.value.id === this.repostaAlternativaId) {
            this.form.get('resposta')?.patchValue(i);
          }
        });
      });
  }

  atualizar() {
    this._questaoHttpService
      .atualizar(this.form.get('id')?.value, this.form.get('enunciado')?.value)
      .pipe(
        switchMap((_q) =>
          this._questaoHttpService.definirCategoria(
            this.form.get('id')?.value,
            this.form.get('categoria')?.value
          )
        ),

        switchMap(() => {
          let i: number = 0;
          const obj: { [i: number]: Observable<IAlternativa> } = {};
          this.alternativasFormArray.controls.forEach((c) => {
            const alternativa = c.get('alternativa')?.value;
            const alternativaId = c.get('id')?.value;
            if (alternativaId) {
              obj[i++] = this._alternativaHttpService.atualizar(
                alternativaId,
                alternativa
              );
            } else {
              obj[i++] = this._alternativaHttpService.criar(
                this.form.get('id')?.value,
                alternativa
              );
            }
          });
          return forkJoin(obj);
        }),

        switchMap((res) => {
          const r = this.form.get('resposta')?.value;
          return this._questaoHttpService.definirReposta(
            this.form.get('id')?.value,
            res[r]?.id
          );
        })
      )
      .subscribe({
        next: (_res) => {
          this._snackBar.open('Questão atualizada com sucesso', 'Fechar', {
            duration: 3500,
          });
          this._router.navigate(['../..'], { relativeTo: this._route });
        },
      });
  }

  adicionarAlternativa() {
    this.alternativasFormArray.push(this._criarAlternativaFormGroup());
  }

  removerAlternativa() {
    const last = this.alternativasFormArray.controls.length - 1;
    const alternativaControl = this.alternativasFormArray.at(last);
    const id = alternativaControl.get('id')?.value;
    if (id) {
      this._alternativaHttpService
        .remover(id)
        .subscribe(() =>
          this.alternativasFormArray.removeAt(
            this.alternativasFormArray.controls.length - 1
          )
        );
    } else {
      this.alternativasFormArray.removeAt(
        this.alternativasFormArray.controls.length - 1
      );
    }
  }

  private _criarAlternativaFormGroup() {
    return this._fb.group({
      id: [null],
      alternativa: [null, Validators.required],
    });
  }
}

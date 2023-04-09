import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { ProvaHttpService } from '../../../common/http/prova-http.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {
  private _provaId: number = -1;
  form: FormGroup;

  constructor(
    _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _router: Router,
    private _provaHttpService: ProvaHttpService
  ) {
    this.form = _fb.group({
      id: [null, Validators.required],
      nome: [null, Validators.required],
    });
  }

  ngOnInit() {
    this._route.params
      .pipe(tap((params) => (this._provaId = params['id'])))
      .subscribe(() => this._carregarProva());
  }

  private _carregarProva() {
    this._provaHttpService.recuperarPorId(this._provaId).subscribe(res => {
      this.form.get('id')?.patchValue(res.id)
      this.form.get('nome')?.patchValue(res.nomeProva)
    });
  }

  atualizar() {

    this._provaHttpService.atualizar(this.form.value).subscribe({
      next: () => {
        this._snackBar.open('Prova atualizada com sucesso', 'Fechar', {
          duration: 3500,
        });
        this._router.navigate(['/admin/prova'])
      },
    });
  }
}

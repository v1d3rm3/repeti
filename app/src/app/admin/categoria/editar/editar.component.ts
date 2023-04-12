import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { CategoriaHttpService } from '../../../common/http/categoria-http.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent {
  private _categoriaId: number = -1;
  form: FormGroup;

  constructor(
    _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoriaHttpService: CategoriaHttpService
  ) {
    this.form = _fb.group({
      id: [null, Validators.required],
      categoria: [null, Validators.required],
    });
  }

  ngOnInit() {
    this._route.params
      .pipe(tap((params) => (this._categoriaId = params['id'])))
      .subscribe(() => this._carregarCategoria());
  }

  private _carregarCategoria() {
    this._categoriaHttpService
      .recuperarPorId(this._categoriaId)
      .subscribe((res) => {
        this.form.patchValue(res);
      });
  }

  atualizar() {
    this._categoriaHttpService.atualizar(this.form.value).subscribe({
      next: () => {
        this._snackBar.open('Categoria atualizada com sucesso', 'Fechar', {
          duration: 3500,
        });
        this._router.navigate(['/admin/categoria']);
      },
    });
  }
}

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriaHttpService } from '../../../common/http/categoria-http.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss'],
})
export class CadastrarComponent {
  form: FormGroup;
  control = new FormControl('');

  constructor(
    _fb: FormBuilder,
    private _categoriaHttpService: CategoriaHttpService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.form = _fb.group({
      categoria: [null, Validators.required],
    });
  }

  cadastrar() {
    this._categoriaHttpService
      .criar(this.form.get('categoria')?.value)
      .subscribe({
        next: () => {
          this._snackBar.open('Categoria cadastrada com sucesso', 'Fechar', {
            duration: 3500,
          });
          this._router.navigate(['/user/categoria']);
        },
      });
  }
}

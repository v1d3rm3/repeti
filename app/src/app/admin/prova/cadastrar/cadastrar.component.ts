import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProvaHttpService } from '../../../common/http/prova-http.service';

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
    private _provaHttpService: ProvaHttpService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.form = _fb.group({
      nome: [null, Validators.required],
    });
  }

  cadastrar() {
    this._provaHttpService.criar(this.form.get('nome')?.value).subscribe({
      next: () => {
        this._snackBar.open('Prova cadastrada com sucesso', 'Fechar', {
          duration: 3500,
        });
        this._router.navigate(['/admin/prova'])
      },
    });
  }
}

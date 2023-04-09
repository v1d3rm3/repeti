import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { IListarPermissaoResponseDto } from 'src/app/common/dto/listar-permissao-response.dto';
import { CategoriaHttpService } from 'src/app/common/http/categoria-http.service';
import { PermissaoHttpService } from 'src/app/common/http/permissao-http-service';
import { UsuarioHttpService } from 'src/app/common/http/usuario-http.service';
import { IUsuario } from 'src/app/common/models/usuario';

@Component({
  selector: 'app-permissao',
  templateUrl: './permissao.component.html',
  styleUrls: ['./permissao.component.scss'],
})
export class PermissaoComponent {
  private _usuarioId: number = -1;
  permissoes$!: Observable<IListarPermissaoResponseDto[]>;
  usuario$!: Observable<IUsuario>;
  form: FormGroup;

  constructor(
    _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioHttpService: UsuarioHttpService,
    private _permissaoHttpService: PermissaoHttpService
  ) {
    this.form = _fb.group({
      permissao: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.permissoes$ = this._permissaoHttpService.recuperar();
    this._route.params
      .pipe(tap((params) => (this._usuarioId = params['id'])))
      .subscribe(() => {
        this.usuario$ = this._usuarioHttpService.recuperarPorId(
          this._usuarioId
        );
      });
  }

  atualizar() {
    this._usuarioHttpService
      .atualizarPermissao(this._usuarioId, this.form.value)
      .subscribe({
        next: () => {
          this._snackBar.open('Permissões atualizadas com sucesso', 'Fechar', {
            duration: 3500,
          });
          this._router.navigate(['/admin/usuario']);
        },
      });
  }
}

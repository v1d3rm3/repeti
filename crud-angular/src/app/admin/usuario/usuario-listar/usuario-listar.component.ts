import { NovoUsuario } from './../../../home/cadastro/NovoUsuario';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { IListarUsuarioResponseDto } from 'src/app/common/dto/listar-usuario-response.dto';
import { ProvaHttpService } from 'src/app/common/http/prova-http.service';
import { UsuarioHttpService } from 'src/app/common/http/usuario-http.service';

@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.scss'],
})
export class UsuarioListarComponent {
  usuarios$: IListarUsuarioResponseDto[] = [];
  displayedColumns: string[] = ['nome', 'acoes'];

  constructor(private _usuarioHttpService: UsuarioHttpService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this._carregarUsuarios();
  }

  private _carregarUsuarios() {
    const sub = this._usuarioHttpService
      .recuperar()
      .subscribe((res) => (this.usuarios$ = res));
  }

  excluir(el: IListarUsuarioResponseDto) {
    this._usuarioHttpService.excluir(el.id).subscribe({
      next: () => {
        this._carregarUsuarios();
        this._snackBar.open('Usuario excluída com sucesso', 'Fechar', {
          duration: 3500,
        });
      },
      error: () => {
        this._snackBar.open('Não foi possível excluír este Usuario', 'Fechar', {
          duration: 3500,
        });
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaHttpService } from '../../../common/http/categoria-http.service';
import { ICategoria } from '../../../common/models/categoria';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'acoes'];
  categorias: ICategoria[] = [];

  constructor(
    private _categoriaHttpService: CategoriaHttpService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._carregarCategorias();
  }

  private _carregarCategorias() {
    const sub = this._categoriaHttpService
      .recuperar()
      .subscribe((res) => (this.categorias = res));
  }

  excluir(el: ICategoria) {
    this._categoriaHttpService.excluir(el.id).subscribe({
      next: () => {
        this._carregarCategorias();
        this._snackBar.open('Categoria excluída com sucesso', 'Fechar', {
          duration: 3500,
        });
      },
      error: () => {
        this._snackBar.open('Não foi possível excluír esta categoria', 'Fechar', {
          duration: 3500,
        });
      },
    });
  }
}

import { DialogModule, DialogRef } from '@angular/cdk/dialog';
import { CdkListbox, CdkOption } from '@angular/cdk/listbox';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { environment } from '../../../environments/environments';
import { CategoriaHttpService } from '../../common/http/categoria-http.service';

interface Categoria {
  id: number;
  categoria: string;
}

@Component({
  selector: 'app-criar-estudo-dialog',
  standalone: true,
  imports: [
    HttpClientModule,
    CdkListbox,
    NgFor,
    CdkOption,
    NgIf,
    JsonPipe,
    ReactiveFormsModule,
    DialogModule,
  ],
  styles: [
    `
      :host {
        display: block;
        background: #fff;
      }
    `,
  ],
  template: `
    <div class="p-3">
      <h2 class="text-xl font-bold mb-3">Criar estudo</h2>
      <input
        type="text"
        [formControl]="filtroControl"
        placeholder="Filtre por nome..."
        class="w-full outline-none py-2 text-lg border p-3 rounded shadow-sm"
      />
      <p
        *ngIf="!this.filtroControl.value || this.filtroControl.value === ''"
        class="w-full text-xl text-center py-3 text-gray-400 mt-2"
      >
        Filtre por uma categoria para aparecer resultados...
      </p>

      <p
        *ngIf="
          categorias.length == 0 &&
          this.filtroControl.value &&
          this.filtroControl.value !== ''
        "
        class="w-full text-xl text-center py-3 mt-3 text-red-600"
      >
        Não há categorias com esse nome
      </p>

      <ul
        *ngIf="this.filtroControl.value && this.filtroControl.value !== ''"
        cdkListbox
        [cdkListboxValue]="categoria"
        (cdkListboxValueChange)="selecionado($event.value)"
        class="mt-3"
      >
        <li
          *ngFor="let cat of categorias"
          [cdkOption]="cat"
          class="w-full p-3 hover:bg-gray-200 focus:bg-gray-200 rounded cursor-pointer"
        >
          {{ cat.categoria }}
        </li>
      </ul>
    </div>
  `,
})
export class CriarEstudoDialogComponent implements OnInit {
  filtroControl: FormControl<string>;
  categorias: Categoria[] = [];
  categoria: readonly Categoria[] = [];

  constructor(
    private _categoriaHttpService: CategoriaHttpService,
    private _dialogRef: DialogRef<boolean>
  ) {
    this.filtroControl = new FormControl();
  }

  ngOnInit() {
    this._carregarCategorias(() => {
      this.filtroControl.valueChanges.pipe(debounceTime(200)).subscribe(() => this._carregarCategorias());
    });
  }

  private _carregarCategorias(after?: () => void) {
    const nome = this.filtroControl.value;
    this._categoriaHttpService.recuperarPorNome(nome).subscribe(res => {
      this.categorias = res;
      if (after) after();
    });
  }

  selecionado(categorias: readonly Categoria[]) {
    const [categoria] = categorias;
    console.log(categoria);

    // this._httpClientService
    //   .post(`${environment.apiURL}/estudo`, {
    //     nivel: 'MuitoFacil',
    //     categoria: categoria.id,
    //   })
    //   .subscribe({
    //     next: () => this._dialogRef.close(true),
    //   });
  }
}

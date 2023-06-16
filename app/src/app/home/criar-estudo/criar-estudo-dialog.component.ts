import { DialogModule, DialogRef } from '@angular/cdk/dialog';
import { CdkListbox, CdkOption } from '@angular/cdk/listbox';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { environment } from '../../../environments/environments';

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
      <h2 class="text-2xl mb-3">Criar estudo</h2>
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
          categoriasFiltros.length == 0 &&
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
          *ngFor="let cat of categoriasFiltros"
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
  categoriasFiltros: Categoria[] = [];

  categoria: readonly Categoria[] = [];

  constructor(
    private _httpClientService: HttpClient,
    private _dialogRef: DialogRef<boolean>
  ) {
    this.filtroControl = new FormControl();
  }

  ngOnInit() {
    this.filtroControl.valueChanges.pipe(debounceTime(200)).subscribe((res) => {
      this.categoriasFiltros = this.categorias.filter((v) => {
        const a = res
          ?.toUpperCase()
          ?.normalize('NFD')
          ?.replace(/[\u0300-\u036f]/g, '');
        const b = v?.categoria
          ?.toUpperCase()
          ?.normalize('NFD')
          ?.replace(/[\u0300-\u036f]/g, '');
        return b.includes(a);
      });
    });

    this._httpClientService
      .get<Categoria[]>(`${environment.apiURL}/categorias`)
      .subscribe((res) => {
        this.categorias = res;
      });
  }

  selecionado(categorias: readonly Categoria[]) {
    const [categoria] = categorias;
    this._httpClientService
      .post(`${environment.apiURL}/estudo`, {
        nivel: 'MuitoFacil',
        categoria: categoria.id,
      })
      .subscribe({
        next: () => this._dialogRef.close(true),
      });

    // criar estudo...

    // _dialogRef
  }
}

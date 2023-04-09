import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ProvaListarComponent } from './prova-listar/prova-listar.component';
import { ProvaRoutingModule } from './prova-routing.module';
import { EditarComponent } from './editar/editar.component';

@NgModule({
  declarations: [CadastrarComponent, ProvaListarComponent, EditarComponent],
  imports: [
    CommonModule,
    ProvaRoutingModule,
    MatButtonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
  ],
})
export class ProvaModule {}

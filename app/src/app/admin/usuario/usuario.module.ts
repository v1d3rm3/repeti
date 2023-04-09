import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioListarComponent } from './usuario-listar/usuario-listar.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PermissaoComponent } from './permissao/permissao.component';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [UsuarioListarComponent, PermissaoComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MatButtonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatRadioModule,
  ],
})
export class UsuarioModule {}

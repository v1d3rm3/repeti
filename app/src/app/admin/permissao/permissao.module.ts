import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissaoRoutingModule } from './permissao-routing.module';
import { PermissaoListarComponent } from './permissao-listar/permissao-listar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [PermissaoListarComponent],
  imports: [
    CommonModule,
    PermissaoRoutingModule,
    MatButtonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
  ],
})
export class PermissaoModule {}

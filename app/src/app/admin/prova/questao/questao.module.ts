import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';

import { CadastrarQuestaoComponent } from './cadastrar/cadastrar.component';
import { QuestaoListarComponent } from './listar/listar.component';
import { QuestaoRoutingModule } from './questao-routing.module';
import { EditarQuestaoComponent } from './editar/editar.component';

@NgModule({
  declarations: [QuestaoListarComponent, CadastrarQuestaoComponent, EditarQuestaoComponent],
  imports: [
    CommonModule,
    QuestaoRoutingModule,
    MatButtonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    TextFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatRadioModule
  ],
})
export class QuestaoModule {}

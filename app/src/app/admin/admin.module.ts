import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './main/main.component';
import { SemAutorizacaoComponent } from './sem-autorizacao/sem-autorizacao.component';

@NgModule({
  declarations: [SemAutorizacaoComponent, MainComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
  ],
})
export class AdminModule {}

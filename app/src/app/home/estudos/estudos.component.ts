import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { CriarEstudoDialogComponent } from '../criar-estudo/criar-estudo-dialog.component';

@Component({
  selector: 'app-estudos',
  templateUrl: './estudos.component.html',
  styles: [],
})
export class EstudosComponent {
  estudos: any[] = [];

  constructor(public dialog: Dialog) {}

  adicionarEstudo() {
    const dialogRef = this.dialog.open<string>(CriarEstudoDialogComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.closed.subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}

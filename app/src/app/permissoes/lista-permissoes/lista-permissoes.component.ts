import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Permissoes } from '../permissoes';
import { PermissoesService } from '../permissoes.service';

@Component({
  selector: 'app-lista-permissoes',
  templateUrl: './lista-permissoes.component.html',
  styleUrls: ['./lista-permissoes.component.scss'],
})
export class ListaPermissoesComponent {
  permissoes$!: Observable<Permissoes>;

  constructor(private permissoesService: PermissoesService) {}

  ngOnInit() {
    this.permissoes$ = this.permissoesService.todasAsPermissoes();
  }
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IListarListaDeEstudoResponseDto } from 'src/app/common/dto/listar-lista-de-estudo-response.dto';
import { ListaDeEstudoHttpService } from 'src/app/common/http/lista-de-estudo-service';

@Component({
  selector: 'app-lista-de-estudo-listar',
  templateUrl: './lista-de-estudo-listar.component.html',
  styleUrls: ['./lista-de-estudo-listar.component.scss'],
})
export class ListaDeEstudoListarComponent {
  listasDeEstudo$!: Observable<IListarListaDeEstudoResponseDto[]>;
  displayedColumns: string[] = ['nome', 'acoes'];

  constructor(private listaDeEstudoHttpService: ListaDeEstudoHttpService) {}

  ngOnInit() {
    this.listasDeEstudo$ = this.listaDeEstudoHttpService.recuperar();
  }
}

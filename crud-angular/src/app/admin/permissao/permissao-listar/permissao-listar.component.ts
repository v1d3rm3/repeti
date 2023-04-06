import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IListarPermissaoResponseDto } from 'src/app/common/dto/listar-permissao-response.dto';
import { PermissaoHttpService } from 'src/app/common/http/permissao-http-service';

@Component({
  selector: 'app-permissao-listar',
  templateUrl: './permissao-listar.component.html',
  styleUrls: ['./permissao-listar.component.scss'],
})
export class PermissaoListarComponent {
  permissoes$!: Observable<IListarPermissaoResponseDto[]>;
  displayedColumns: string[] = ['nome', 'acoes'];

  constructor(private _permissaoHttpService: PermissaoHttpService) {}

  ngOnInit() {
    this.permissoes$ = this._permissaoHttpService.recuperar();
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from './cadastro.service';
import { NovoUsuario } from './NovoUsuario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {
  cadastroForm!: FormGroup;
  hide: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private cadastroService: CadastroService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
    });
  }

  gerarPermissao(usuario: NovoUsuario) {
    this.cadastroService.cadastrarPermissoes(usuario).subscribe(
      () => { },
      (error) => {
        console.log(error);
      }
    );
  }

  cadastrar() {
    if (this.cadastroForm.valid) {
      const usuario: NovoUsuario =
        this.cadastroForm.getRawValue() as NovoUsuario;
      this.cadastroService.cadastrarNovoUsuario(usuario).subscribe(
        () => {
          this.router.navigate(['autenticacao/entrar']);
          this.gerarPermissao(usuario);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}

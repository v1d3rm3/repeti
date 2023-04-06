package com.projetounidade2.projetorestapisecurity.rest.form;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class UsuarioPermissaoForm {

    @NotBlank @NotNull
    private String nomePermissao;

    public UsuarioPermissaoForm(String nomePermissao) {
        this.setNomePermissao(nomePermissao);
    }

    public void setNomePermissao(String nomePermissao) {

        this.nomePermissao = nomePermissao;
    }
    

}

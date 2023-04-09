package com.repeti.api.rest.form;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.repeti.api.model.Permissao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PermissaoForm {

    @NotBlank @NotNull
    private String nome;

    public Permissao converter() {
        Permissao permissao = new Permissao();
        permissao.setNome(this.nome);
        return permissao;
    }

}

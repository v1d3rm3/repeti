package com.repeti.api.dao;

import com.repeti.api.model.Estudo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InserirEstudoBancoObjeto {

    private String nivel;
    private int usuarioId;
    private int categoriaId;

    private InserirEstudoBancoObjeto() {
    }

    public static InserirEstudoBancoObjeto deEstudo(Estudo estudo) {
        var obj = new InserirEstudoBancoObjeto();
        obj.categoriaId = estudo.getCategoria().getId();
        obj.nivel = estudo.getNivelAtual().toString();
        obj.usuarioId = estudo.getUsuario().getId();
        return obj;
    }
}

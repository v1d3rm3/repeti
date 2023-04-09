package com.repeti.api.rest.dto.questao;

import com.repeti.api.model.Categoria;

import lombok.Data;

@Data
public class CategoriaQuestaoDto {
    private Integer id;
    private String categoria;

    public CategoriaQuestaoDto(Categoria categoria) {
        this.id = categoria.getId();
        this.categoria = categoria.getCategoria();
    }
}

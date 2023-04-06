package com.projetounidade2.projetorestapisecurity.rest.dto;

import com.projetounidade2.projetorestapisecurity.model.Categoria;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoriaDTO {

    private String categoria;

    public CategoriaDTO(Categoria categoria) {
        this.categoria = categoria.getCategoria();
    }
}

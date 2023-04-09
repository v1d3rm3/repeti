package com.repeti.api.rest.dto;

import com.repeti.api.model.Categoria;

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

package com.repeti.api.rest.form;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.repeti.api.model.Categoria;
import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoriaForm {
    
    @NotNull @NotEmpty @Length(min = 5)
    private String categoria;

    private int pai;

    public Categoria converter() {
        return new Categoria(this.categoria);
    }
}

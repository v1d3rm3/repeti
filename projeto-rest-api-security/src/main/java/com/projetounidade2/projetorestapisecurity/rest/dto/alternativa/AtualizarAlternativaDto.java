package com.projetounidade2.projetorestapisecurity.rest.dto.alternativa;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class AtualizarAlternativaDto {
    @NotBlank(message = "Campo Alternativa não pode ser vazio")
    private String alternativa;
}

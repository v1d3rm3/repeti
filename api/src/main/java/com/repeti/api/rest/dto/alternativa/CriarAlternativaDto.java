package com.repeti.api.rest.dto.alternativa;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import lombok.Data;


@Data
public class CriarAlternativaDto {
    @NotBlank(message = "Campo Alternativa não pode ser vazio")
    String alternativa;
    @Min(value = 0, message = "O QuestaoId precisa ser maior que zero")
    int questaoId;
}

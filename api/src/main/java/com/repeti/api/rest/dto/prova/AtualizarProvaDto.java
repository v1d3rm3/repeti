package com.repeti.api.rest.dto.prova;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class AtualizarProvaDto {
    int id;
    @NotBlank(message = "Campo 'nome' não pode ser vazio")
    String nome;
}

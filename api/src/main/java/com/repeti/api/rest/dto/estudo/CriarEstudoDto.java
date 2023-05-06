package com.repeti.api.rest.dto.estudo;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class CriarEstudoDto {
  @NotBlank(message = "Campo 'categoriaId' não pode ser vazio")
  int categoriaId;
}

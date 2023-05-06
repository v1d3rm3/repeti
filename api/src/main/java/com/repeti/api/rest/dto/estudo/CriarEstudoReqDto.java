package com.repeti.api.rest.dto.estudo;

import javax.validation.constraints.Positive;

import lombok.Data;

@Data
public class CriarEstudoReqDto {
  @Positive
  private int categoria;
}

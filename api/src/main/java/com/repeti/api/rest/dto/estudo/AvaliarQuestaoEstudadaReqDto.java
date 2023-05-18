package com.repeti.api.rest.dto.estudo;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import com.repeti.api.model.Nivel;
import com.repeti.api.model.Qualidade;

import lombok.Data;

@Data
public class AvaliarQuestaoEstudadaReqDto {
  @NotNull
  @Positive
  private Integer questaoEstudadaId;
  @NotNull
  private Nivel nivel;
  @NotNull
  private Qualidade qualidade;
}

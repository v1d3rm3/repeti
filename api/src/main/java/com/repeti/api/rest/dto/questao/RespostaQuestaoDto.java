package com.repeti.api.rest.dto.questao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Data
public class RespostaQuestaoDto {
    private boolean status;
    private Integer resposta;
}

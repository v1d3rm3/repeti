package com.projetounidade2.projetorestapisecurity.rest.dto;

import com.projetounidade2.projetorestapisecurity.model.Alternativa;

import lombok.Data;

@Data
public class AlternativaDto {
    int id;
    String alternativa;
    QuestaoDto questao;

    public static AlternativaDto from(Alternativa alternativa) {
        var dto = new AlternativaDto();
        dto.setId(alternativa.getId());
        dto.setAlternativa(alternativa.getAlternativa());
        dto.setQuestao(QuestaoDto.from(alternativa.getQuestao()));
        return dto;
    }
}

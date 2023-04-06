package com.projetounidade2.projetorestapisecurity.rest.dto.alternativa;

import com.projetounidade2.projetorestapisecurity.model.Alternativa;
import com.projetounidade2.projetorestapisecurity.model.Questao;

import lombok.Data;

@Data
public class CriarAlternativaResposeDto {
    int id;
    String alternativa;
    Questao questao;

    public static CriarAlternativaResposeDto from(Alternativa alternativa) {
        var dto = new CriarAlternativaResposeDto();
        dto.setId(alternativa.getId());
        dto.setAlternativa(alternativa.getAlternativa());
        // a.setQuestao(questao);
        return dto;
    }
}

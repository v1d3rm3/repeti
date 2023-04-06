package com.projetounidade2.projetorestapisecurity.rest.dto.questao;


import java.util.ArrayList;
import java.util.List;

import com.projetounidade2.projetorestapisecurity.model.Alternativa;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class AlternativaQuestaoDto {
    int id;
    String alternativa;

    public AlternativaQuestaoDto(Alternativa alt) {
        if(alt != null){

            this.id = alt.getId();
            this.alternativa = alt.getAlternativa();
        }
    }

    public static List<AlternativaQuestaoDto> ListaDeAlternativas(List<Alternativa> alt) {
        List<AlternativaQuestaoDto> a = new ArrayList<AlternativaQuestaoDto>();
        for (Alternativa alternativa : alt) {
            a.add(new AlternativaQuestaoDto(alternativa));
        }
        return a;
    }
}

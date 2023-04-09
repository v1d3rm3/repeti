package com.repeti.api.rest.dto.questao;
import java.util.List;

import com.repeti.api.model.Questao;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class QuestaoCompletaDTO {
    private Integer id;
    private String enunciado;
    private AlternativaQuestaoDto resposta;
    private List<AlternativaQuestaoDto> alternativas;
    private CategoriaQuestaoDto categoria;

    public static QuestaoCompletaDTO from(Questao questao) {
        var dto = new QuestaoCompletaDTO();
        dto.setEnunciado(questao.getEnunciado());
        dto.setId(questao.getId());

        if(questao.getResposta() != null){
            dto.setResposta(new AlternativaQuestaoDto(questao.getResposta()));
        }

        if(questao.getAlternativas() != null) {
            dto.setAlternativas(AlternativaQuestaoDto.ListaDeAlternativas(questao.getAlternativas()));
        }
        
        if(questao.getCategoria() != null) {
            dto.setCategoria(new CategoriaQuestaoDto(questao.getCategoria()));
        }

        return dto;
    }

    public QuestaoCompletaDTO(Questao questao) {
        this.enunciado = questao.getEnunciado();
        this.id = questao.getId();
    }
}

package com.repeti.api.rest.dto;

import com.repeti.api.model.Questao;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class QuestaoDto {
    private Integer id;
    private String enunciado;

    public static QuestaoDto from(Questao questao) {
        QuestaoDto dto = new QuestaoDto();
        dto.setEnunciado(questao.getEnunciado());
        dto.setId(questao.getId());
        return dto;
    }

    public QuestaoDto(Questao questao) {
        this.enunciado = questao.getEnunciado();
        this.id = questao.getId();
    }
}

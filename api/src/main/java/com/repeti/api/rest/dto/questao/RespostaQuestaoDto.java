package com.repeti.api.rest.dto.questao;

import java.util.List;
import java.util.stream.Collectors;

import com.repeti.api.model.QuestaoEstudada;

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

    public RespostaQuestaoDto(QuestaoEstudada questao) {
        this.status = questao.checarResposta();
        this.resposta = questao.getQuestao().getResposta().getId();
    }

    public RespostaQuestaoDto converter(QuestaoEstudada questaoEstudada) {
        this.status = questaoEstudada.checarResposta();
        this.resposta = questaoEstudada.getQuestao().getResposta().getId();
        return this;
    }

    public static RespostaQuestaoDto from(QuestaoEstudada questaoEstudada) {
        var dto = new RespostaQuestaoDto();
        dto.setStatus(questaoEstudada.checarResposta());
        dto.setResposta(questaoEstudada.getQuestao().getResposta().getId());
        return dto;
    }


    public static List<RespostaQuestaoDto> from(List<QuestaoEstudada> list) {
        return list.stream().map(RespostaQuestaoDto::new).collect(Collectors.toList());
    }
}

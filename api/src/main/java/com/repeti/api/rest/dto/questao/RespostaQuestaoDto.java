package com.repeti.api.rest.dto.questao;

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

    public RespostaQuestaoDto converter(QuestaoEstudada questaoEstudada) {
        this.status = questaoEstudada.checarResposta();
        this.resposta = questaoEstudada.getQuestao().getResposta().getId();
        return this;
    }
}

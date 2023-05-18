package com.repeti.api.rest.dto.questao_estudada;

import java.util.List;

import java.util.stream.Collectors;
import com.repeti.api.model.QuestaoEstudada;
import com.repeti.api.rest.dto.questao.RespostaQuestaoDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestaoEstudadaResDTO {
    private int id;
    private int questaoId;
    private int alternativaEscolhidaId;
    private RespostaQuestaoDto resposta;
    
    public QuestaoEstudadaResDTO(QuestaoEstudada questaoEstudada) {
        this.id = questaoEstudada.getId();
        this.questaoId = questaoEstudada.getQuestao().getId();
        this.alternativaEscolhidaId = questaoEstudada.getAlternativaEscolhida().getId();
        this.resposta = RespostaQuestaoDto.from(questaoEstudada);
    }

    public static QuestaoEstudadaResDTO from(QuestaoEstudada questao) {
        var dto = new QuestaoEstudadaResDTO();
        dto.setId(questao.getId());
        dto.setResposta(RespostaQuestaoDto.from(questao));

        return dto;
    }

    public static List<QuestaoEstudadaResDTO> from(List<QuestaoEstudada> list) {
        return list.stream().map(QuestaoEstudadaResDTO::new).collect(Collectors.toList());
    }
}
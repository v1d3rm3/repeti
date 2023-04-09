package com.repeti.api.rest.dto.prova;

import java.util.ArrayList;
import java.util.List;

import com.repeti.api.model.Prova;
import com.repeti.api.rest.dto.questao.QuestaoCompletaDTO;

import lombok.Data;

@Data
public class ProvaDto {
    int id;
    String nomeProva;
    List<QuestaoCompletaDTO> questoes;

    static public ProvaDto from(Prova prova) {
        var p = new ProvaDto();
        p.setId(prova.getId());
        p.setNomeProva(prova.getProvaNome());
        p.questoes = new ArrayList<QuestaoCompletaDTO>();
        prova.getQuestoes().forEach(q -> {
            p.questoes.add(QuestaoCompletaDTO.from(q));
        });
        return p;
    }

    static public List<ProvaDto> from(List<Prova> provas) {
        var ps = new ArrayList<ProvaDto>();
        provas.forEach(p -> {
            ps.add(ProvaDto.from(p));
        });
        return ps;
    }
}

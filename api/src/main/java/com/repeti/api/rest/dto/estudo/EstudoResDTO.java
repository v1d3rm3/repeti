package com.repeti.api.rest.dto.estudo;

import java.util.List;
import java.util.stream.Collectors;

import com.repeti.api.model.Categoria;
import com.repeti.api.model.Estudo;
import com.repeti.api.rest.dto.questao_estudada.QuestaoEstudadaResDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstudoResDTO {
    private int id;
    private Categoria categoria;
    private List<QuestaoEstudadaResDTO> questoesEstudadas;

    public EstudoResDTO(Estudo estudo) {
        this.id = estudo.getId();
        this.categoria = estudo.getCategoria();
        this.questoesEstudadas = QuestaoEstudadaResDTO.from(estudo.getQuestoesEstudadas());
    }

    public static EstudoResDTO from(Estudo estudo) {
        var dto = new EstudoResDTO();
        dto.setId(estudo.getId());
        dto.setCategoria(estudo.getCategoria());

        if(estudo.getQuestoesEstudadas() != null){
            dto.setQuestoesEstudadas(QuestaoEstudadaResDTO.from(estudo.getQuestoesEstudadas()));
        }

        return dto;
    }

    public static List<EstudoResDTO> from(List<Estudo> list) {
        return list.stream().map(EstudoResDTO::new).collect(Collectors.toList());
    }
}
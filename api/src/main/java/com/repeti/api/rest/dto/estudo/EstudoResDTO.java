package com.repeti.api.rest.dto.estudo;

import java.util.List;

import com.repeti.api.model.Categoria;
import com.repeti.api.model.Estudo;
import com.repeti.api.model.QuestaoEstudada;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstudoResDTO {
    private int id;
    private Categoria categoria;
    private List<QuestaoEstudada> questoesEstudadas;

    public static EstudoResDTO from(Estudo estudo) {
        var dto = new EstudoResDTO();
        dto.setId(estudo.getId());
        dto.setCategoria(estudo.getCategoria());

        if(estudo.getQuestoesEstudadas() != null){
            dto.setQuestoesEstudadas(estudo.getQuestoesEstudadas());
        }

        return dto;
    }
}
package com.projetounidade2.projetorestapisecurity.rest.form;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import com.projetounidade2.projetorestapisecurity.model.Questao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuestaoForm {

    @NotNull @NotEmpty @Length(min = 5)
    private String enunciado;

    public Questao converter() {
        return new Questao(this.enunciado);
    }
}

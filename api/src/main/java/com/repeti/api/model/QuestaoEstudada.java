package com.repeti.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "questao_estudada")
public class QuestaoEstudada {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Enumerated(EnumType.STRING)
    @Column(name = "nivel")
    private Nivel nivel;
    @Enumerated(EnumType.STRING)
    @Column(name = "qualidade")
    private Qualidade qualidade;
    @ManyToOne()
    private Usuario usuario;
    @ManyToOne()
    private Estudo estudo;
    @ManyToOne
    private Questao questao;
    @ManyToOne 
    private Alternativa alternativaEscolhida;

    public boolean checarResposta() {
        return questao.checarResposta(alternativaEscolhida.getId());
    }
}

package com.repeti.api.model;

import java.util.List;

import javax.persistence.*;

import org.hibernate.annotations.ColumnDefault;

import com.repeti.api.exception.RegraNegocioException;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

@Entity
@Table(name = "questao")
public class Questao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String enunciado;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    @Enumerated(EnumType.STRING)
    @Column(name = "nivel")
    @ColumnDefault(value = "'MuitoFacil'")
    private Nivel nivel;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "qualidade")
    @ColumnDefault(value = "'Mediana'")
    private Qualidade qualidade;

    @OneToOne
    @JoinColumn(name = "resposta_id")
    private Alternativa resposta;

    @OneToMany
    private List<Alternativa> alternativas;

    public Questao(String enunciado){
        this.enunciado = enunciado;
    }

    public void setResposta(Alternativa resposta) {
        if (!this.alternativas.contains(resposta)) {
            throw new RegraNegocioException("Questão não possui a alternativa informada como resposta");
        }
        
        this.resposta = resposta;
    }

    public boolean checarResposta(Integer id) {
        return (id == resposta.getId()) ? true : false;       
    }
    
}

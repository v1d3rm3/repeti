package com.repeti.api.model;

import java.util.List;

import javax.persistence.*;

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

    @OneToOne
    @JoinColumn(name = "resposta_id")
    private Alternativa resposta;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable( name = "alternativas_questoes", 
    joinColumns = @JoinColumn(name = "questao_id"), 
    inverseJoinColumns = @JoinColumn(name = "alternativa_id"))
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

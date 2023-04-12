package com.repeti.api.model;

import javax.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

@Entity
@Table(name="alternativa")
public class Alternativa {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String alternativa;

    @ManyToOne
    @JoinColumn(name="questao_id", nullable=false)
    private Questao questao;
}

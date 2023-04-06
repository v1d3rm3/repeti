package com.projetounidade2.projetorestapisecurity.model;

import java.util.List;

import javax.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

@Entity
@Table(name = "prova")
public class Prova {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "prova_nome")
    private String provaNome;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "questoes_provas", joinColumns = @JoinColumn(name = "prova_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "questao_id", referencedColumnName = "id"))
    private List<Questao> questoes;
}

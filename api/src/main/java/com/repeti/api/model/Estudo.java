package com.repeti.api.model;

import java.util.List;

import javax.persistence.*;

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
@Table(name = "estudo")
public class Estudo {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Enumerated(EnumType.STRING)
  @Column(name = "nivel")
  private Nivel nivel;

  @Enumerated(EnumType.STRING)
  @Column(name = "qualidade")
  private Qualidade qualidade;

  private Usuario usuario;
  private Categoria categoria;
  private List<Questao> questoesEstudadas; // na verdade, é QuestaoEstudada e não Questao.
}

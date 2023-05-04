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

  @ManyToOne()
  @JoinColumn(name = "usuario_id", nullable = false)
  private Usuario usuario;

  @ManyToOne()
  @JoinColumn(name = "categoria_id", nullable = false)
  private Categoria categoria;

  @OneToMany()
  @JoinColumn(name = "questao_estudada_id", nullable = true)
  private List<QuestaoEstudada> questoesEstudadas;
}

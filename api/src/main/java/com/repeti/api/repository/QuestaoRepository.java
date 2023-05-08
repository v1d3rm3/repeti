package com.repeti.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.repeti.api.model.Nivel;
import com.repeti.api.model.Questao;

public interface QuestaoRepository extends JpaRepository<Questao, Integer> {
  @Query(value = "SELECT q FROM Questao q WHERE q.categoria.id IN (:categorias) AND q.nivel = :nivel")
  List<Questao> recuperarQuestoesPorNivelECategoria(@Param("nivel") Nivel nivel,
      @Param("categorias") List<Integer> categoriasIds);
}

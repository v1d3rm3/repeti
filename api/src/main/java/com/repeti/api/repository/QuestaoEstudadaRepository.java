package com.repeti.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.repeti.api.model.Nivel;
import com.repeti.api.model.QuestaoEstudada;

public interface QuestaoEstudadaRepository extends JpaRepository<QuestaoEstudada, Integer> {
    @Query(value = "SELECT q FROM QuestaoEstudada q WHERE q.estudo.id = :estudoId")
    List<QuestaoEstudada> recuperarQuestaoEstudadasPorEstudo(@Param("estudoId") int estudoId);

    @Query(value = "SELECT q FROM QuestaoEstudada q JOIN q.questao qq WHERE q.estudo.id = :estudoId AND qq.nivel = :nivel")
    List<QuestaoEstudada> recuperarQuestaoEstudadasPorEstudo(@Param("estudoId") int estudoId,
            @Param("nivel") Nivel nivel);
}

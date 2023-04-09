package com.repeti.api.repository;

import com.repeti.api.model.Questao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestaoRepository extends JpaRepository<Questao, Integer>{
    
}

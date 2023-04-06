package com.projetounidade2.projetorestapisecurity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetounidade2.projetorestapisecurity.model.Questao;

public interface QuestaoRepository extends JpaRepository<Questao, Integer>{
    
}

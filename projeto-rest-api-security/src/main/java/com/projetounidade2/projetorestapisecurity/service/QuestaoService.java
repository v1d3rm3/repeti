package com.projetounidade2.projetorestapisecurity.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.projetounidade2.projetorestapisecurity.model.Categoria;
import com.projetounidade2.projetorestapisecurity.model.Questao;


@Service
public interface QuestaoService {
    public Questao saveQuestao(Questao questao);

    public void removeQuestao(String id);

    public Questao getQuestaoById(Integer id);

    public List<Questao> getListQuestao();

    public void atualizarQuestaoEnunciado(int id, String categoria);
    
    public void definirCategoria(Questao questao, Categoria categoria);
}

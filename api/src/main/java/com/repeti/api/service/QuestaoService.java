package com.repeti.api.service;

import java.util.List;

import com.repeti.api.model.Categoria;
import com.repeti.api.model.Questao;
import org.springframework.stereotype.Service;


@Service
public interface QuestaoService {
    public Questao saveQuestao(Questao questao);

    public void removeQuestao(String id);

    public Questao getQuestaoById(Integer id);

    public List<Questao> getListQuestao();

    public void atualizarQuestaoEnunciado(int id, String categoria);
    
    public void definirCategoria(Questao questao, Categoria categoria);
}

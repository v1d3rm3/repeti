package com.projetounidade2.projetorestapisecurity.service.impl;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.projetounidade2.projetorestapisecurity.model.Categoria;
import com.projetounidade2.projetorestapisecurity.model.Questao;
import com.projetounidade2.projetorestapisecurity.repository.QuestaoRepository;
import com.projetounidade2.projetorestapisecurity.service.QuestaoService;

@Component
public class QuestaoServiceImpl implements QuestaoService {
    @Autowired
    QuestaoRepository questaoRepository;

    @Override
    public Questao saveQuestao(Questao questao) { 
        return questaoRepository.save(questao);
    }

    @Override
    public void removeQuestao(String id) {
        questaoRepository.deleteById(Integer.parseInt(id));
    }

    @Override
    public Questao getQuestaoById(Integer id) {
        return questaoRepository.findById(id).map(questao -> {
            return questao;
        }).orElseThrow(() -> null);
    }

    public void definirCategoria(Questao questao, Categoria categoria) {
        questao.setCategoria(categoria);
        questaoRepository.save(questao);
    }

    @Override
    public List<Questao> getListQuestao() {
       return questaoRepository.findAll();
    }

    public void atualizarQuestaoEnunciado(int id, String enunciado) {
        var cat = questaoRepository.getReferenceById(id);
        cat.setEnunciado(enunciado);
        questaoRepository.save(cat);
    }
}
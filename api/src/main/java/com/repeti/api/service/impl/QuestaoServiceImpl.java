package com.repeti.api.service.impl;
import java.util.List;

import com.repeti.api.model.Categoria;
import com.repeti.api.model.Questao;
import com.repeti.api.repository.QuestaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.repeti.api.service.QuestaoService;

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
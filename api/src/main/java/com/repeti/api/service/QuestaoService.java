package com.repeti.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.repeti.api.model.Categoria;
import com.repeti.api.model.Questao;
import com.repeti.api.model.QuestaoEstudada;
import com.repeti.api.rest.dto.estudo.AvaliarQuestaoEstudadaReqDto;

@Service
public interface QuestaoService {
    public Questao saveQuestao(Questao questao);

    public void removeQuestao(String id);

    public Questao getQuestaoById(Integer id);

    public List<Questao> getListQuestao();

    public void atualizarQuestaoEnunciado(int id, String categoria);

    public void definirCategoria(Questao questao, Categoria categoria);

    public QuestaoEstudada avaliarQuestaoEstuda(String usuarioEmail, AvaliarQuestaoEstudadaReqDto params);
}

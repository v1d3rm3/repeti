package com.repeti.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.repeti.api.model.Estudo;
import com.repeti.api.model.Questao;
import com.repeti.api.model.QuestaoEstudada;

@Service
public interface EstudoService {
    public List<Estudo> recuperarEstudosDeUsuario();
    public Estudo recuperarEstudoPorId(int id);
    public Estudo criar(int categoriaId);
    public void pararEstudo(int estudo);
    public Questao proximaQuestao(int estudoId);
    public QuestaoEstudada resolver(int questaoId, int alternativaId, int estudoId);
}

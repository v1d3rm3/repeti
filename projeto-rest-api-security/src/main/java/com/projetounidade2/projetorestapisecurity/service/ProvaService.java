package com.projetounidade2.projetorestapisecurity.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.projetounidade2.projetorestapisecurity.model.Prova;

@Service
public interface ProvaService {

    public Prova criar(String nomeProva);

    public Prova atualizar(int id, String prova);

    public void remover(int id);

    public List<Prova> listar();

    public Prova recuperarPorId(int id);
    
    public void adicionarQuestao(int provaId, int questaoId);
}

package com.repeti.api.service;

import java.util.List;

import com.repeti.api.model.Prova;
import org.springframework.stereotype.Service;

@Service
public interface ProvaService {

    public Prova criar(String nomeProva);

    public Prova atualizar(int id, String prova);

    public void remover(int id);

    public List<Prova> listar();

    public Prova recuperarPorId(int id);
    
    public void adicionarQuestao(int provaId, int questaoId);
}

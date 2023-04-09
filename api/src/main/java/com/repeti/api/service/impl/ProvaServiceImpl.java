package com.repeti.api.service.impl;

import java.util.List;

import com.repeti.api.model.Prova;
import com.repeti.api.repository.ProvaRepository;
import com.repeti.api.repository.QuestaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.repeti.api.service.ProvaService;

@Component
public class ProvaServiceImpl implements ProvaService {

    @Autowired
    ProvaRepository provaRepository;

    @Autowired
    QuestaoRepository questaoRepository;

    @Override
    public Prova criar(String nomeProva) {
        var prova = new Prova();
        prova.setProvaNome(nomeProva);
        return provaRepository.save(prova);
    }

    @Override
    public Prova atualizar(int id, String prova) {
        var p = provaRepository.findById(id);

        if (!p.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Prova não existe");
        }

        var provaFinal = p.get();
        provaFinal.setProvaNome(prova);

        provaRepository.save(provaFinal);
        return provaFinal;
    }

    @Override
    public void remover(int id) {
        var prova = provaRepository.findById(id);

        if (!prova.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Prova não existe");
        }

        provaRepository.delete(prova.get());

    }

    @Override
    public List<Prova> listar() {
        return provaRepository.findAll();
    }

    @Override
    public Prova recuperarPorId(int id) {
        var prova = provaRepository.findById(id);

        if (!prova.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Prova não existe");
        }

        return prova.get();
    }

    @Override
    public void adicionarQuestao(int provaId, int questaoId) {
        var prova = provaRepository.findById(provaId);

        if (!prova.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Prova não existe");
        }

        var questao = questaoRepository.findById(questaoId);
        
        if (!questao.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Questão não existe");
        }

        var p = prova.get();

        p.getQuestoes().add(questao.get());

        provaRepository.save(p);
    }
}
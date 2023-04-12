package com.repeti.api.service.impl;

import java.util.List;

import com.repeti.api.repository.AlternativaRepository;
import com.repeti.api.repository.QuestaoRepository;
import com.repeti.api.rest.dto.alternativa.CriarAlternativaDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.repeti.api.model.Alternativa;
import com.repeti.api.service.AlternativaService;

@Component
public class AlternativaServiceImpl implements AlternativaService {

    @Autowired
    protected QuestaoRepository questaoRepository;

    @Autowired
    protected AlternativaRepository alternativaRepository;

    @Override
    public Alternativa criar(CriarAlternativaDto params) {
        var questao = questaoRepository.findById(params.getQuestaoId());
        if (!questao.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Questão não existe");
        }

        var questao_final = questao.get();

        var alternativa = new Alternativa();
        alternativa.setQuestao(questao_final);
        alternativa.setAlternativa(params.getAlternativa());
        alternativa = alternativaRepository.save(alternativa);

        return alternativa;
    }

    @Override
    public void remover(int id) {
        var alternativa = alternativaRepository.findById(id);
        if (!alternativa.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Alternativa não existe");
        }

        var alternativa_final = alternativa.get();
        alternativaRepository.delete(alternativa_final);
    }

    @Override
    public Alternativa atualizar(int id, String alt) {
        var alternativa = alternativaRepository.findById(id);
        if (!alternativa.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Alternativa não existe");
        }

        var alternativa_final = alternativa.get();
        alternativa_final.setAlternativa(alt);
        alternativaRepository.save(alternativa_final);
        return alternativa_final;
    }

    @Override
    public List<Alternativa> listarPorQuestaoId(int id) {
        return alternativaRepository.recuperarPorQuestaoId(id);
    }

    @Override
    public Alternativa recuperarPorId(Integer id) {
        var alternativa = alternativaRepository.findById(id);
        if (!alternativa.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Alternativa não existe");
        }
        return alternativa.get();
    }

}
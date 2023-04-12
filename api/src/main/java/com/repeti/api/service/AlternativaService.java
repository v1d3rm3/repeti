package com.repeti.api.service;

import java.util.List;

import com.repeti.api.rest.dto.alternativa.CriarAlternativaDto;
import org.springframework.stereotype.Service;

import com.repeti.api.model.Alternativa;

@Service
public interface AlternativaService {
    public Alternativa criar(CriarAlternativaDto params);
    public void remover(int id);
    public Alternativa atualizar(int id, String alt);
    public List<Alternativa> listarPorQuestaoId(int id);
    public Alternativa recuperarPorId(Integer id);
    // public List<Alternativa> getListAlternativa();
}

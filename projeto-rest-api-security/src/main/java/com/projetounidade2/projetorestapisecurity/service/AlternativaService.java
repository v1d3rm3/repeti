package com.projetounidade2.projetorestapisecurity.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.projetounidade2.projetorestapisecurity.model.Alternativa;
import com.projetounidade2.projetorestapisecurity.rest.dto.alternativa.CriarAlternativaDto;

@Service
public interface AlternativaService {
    public Alternativa criar(CriarAlternativaDto params);
    public void remover(int id);
    public Alternativa atualizar(int id, String alt);
    public List<Alternativa> listarPorQuestaoId(int id);
    public Alternativa recuperarPorId(Integer id);
    // public List<Alternativa> getListAlternativa();
}

package com.projetounidade2.projetorestapisecurity.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.projetounidade2.projetorestapisecurity.model.Permissao;

@Service
public interface PermissaoService {
    public Permissao savePermissao(Permissao permissao);

    public void removePermissao(Long id);

    Permissao getPermissaoByNome(String nome); 

    public Permissao getPermissaoById(Long id);

    public List<Permissao> getListPermissao();

    public void atualizarPermissao(Long id, String nome);
}

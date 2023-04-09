package com.repeti.api.service;

import java.util.List;

import com.repeti.api.model.Permissao;
import org.springframework.stereotype.Service;

@Service
public interface PermissaoService {
    public Permissao savePermissao(Permissao permissao);

    public void removePermissao(Long id);

    Permissao getPermissaoByNome(String nome); 

    public Permissao getPermissaoById(Long id);

    public List<Permissao> getListPermissao();

    public void atualizarPermissao(Long id, String nome);
}

package com.repeti.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.repeti.api.model.Estudo;
import com.repeti.api.model.Nivel;

@Service
public interface EstudoService {
    public List<Estudo> recuperarEstudosDeUsuario();
    public Estudo recuperarEstudoPorId(int id);
    public Estudo criar(int categoriaId);
}

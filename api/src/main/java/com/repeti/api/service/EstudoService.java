package com.repeti.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.repeti.api.model.Estudo;
import com.repeti.api.rest.dto.estudo.RecuperarEstudosPorUsuarioDto;

@Service
public interface EstudoService {
    public List<Estudo> recuperarEstudosDeUsuario(RecuperarEstudosPorUsuarioDto params);
    // public Estudo criar()
}

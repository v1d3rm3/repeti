package com.repeti.api.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.repeti.api.model.Estudo;
import com.repeti.api.repository.EstudoRepository;
import com.repeti.api.rest.dto.estudo.RecuperarEstudosPorUsuarioDto;
import com.repeti.api.service.EstudoService;

@Component
public class EstudoServiceImpl implements EstudoService {

    @Autowired
    EstudoRepository estudoRepository;

    @Override
    public List<Estudo> recuperarEstudosDeUsuario(RecuperarEstudosPorUsuarioDto params) {
        return this.estudoRepository.listar(params.getUsuarioId());
    }

}

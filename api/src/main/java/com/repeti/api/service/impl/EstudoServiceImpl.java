package com.repeti.api.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.repeti.api.exception.RegraNegocioException;
import com.repeti.api.model.Estudo;
import com.repeti.api.model.Nivel;
import com.repeti.api.repository.CategoriaRepository;
import com.repeti.api.repository.EstudoRepository;
import com.repeti.api.repository.UsuarioRepository;
import com.repeti.api.service.EstudoService;

@Component
public class EstudoServiceImpl implements EstudoService {

    @Autowired
    EstudoRepository estudoRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    CategoriaRepository categoriaRepository;

    @Override
    public List<Estudo> recuperarEstudosDeUsuario() {
        var email = SecurityContextHolder.getContext().getAuthentication().getName();
        var usuario = usuarioRepository.findByEmail(email).get();
        return this.estudoRepository.listar(usuario.getId());
    }

    @Override
    public Estudo recuperarEstudoPorId(int id) {
        var optionalEstudo = this.estudoRepository.findById(id);

        if (!optionalEstudo.isPresent()) {
            throw new RegraNegocioException("Estudo não existe");
        }

        return optionalEstudo.get();
    }

    @Override
    public Estudo criar(int categoriaId) {
        var categoriaOptional = categoriaRepository.findById(categoriaId);
        if (!categoriaOptional.isPresent()) {
            throw new RegraNegocioException("Categoria não existe");
        }
        var estudo = new Estudo();
        estudo.setCategoria(categoriaOptional.get());
        estudo.setNivel(Nivel.MuitoFacil);

        var email = SecurityContextHolder.getContext().getAuthentication().getName();
        var usuario = usuarioRepository.findByEmail(email).get();
        estudo.setUsuario(usuario);

        return estudoRepository.save(estudo);
    }

}

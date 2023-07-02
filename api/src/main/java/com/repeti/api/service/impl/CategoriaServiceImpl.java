package com.repeti.api.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.repeti.api.exception.EntidadeNaoEncontradaException;
import com.repeti.api.model.Categoria;
import com.repeti.api.repository.CategoriaRepository;
import com.repeti.api.service.CategoriaService;

@Component
public class CategoriaServiceImpl implements CategoriaService {

    @Autowired
    CategoriaRepository categoriaRepository;

    @Override
    public Categoria saveCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Override
    public void removeCategoria(String id) {
        categoriaRepository.deleteById(Integer.parseInt(id));
    }

    // @Override
    // public Categoria getCategoriaByNome(String nome) {
    //     return categoriaRepository.recuperarPorNome(nome);
    // }

    // @Override
    // public List<Categoria> getListCategoria() {
    // return categoriaRepository.findAll();
    // }

    @Override
    public Categoria recuperarPorId(int id) {
        return categoriaRepository.getReferenceById(id);
    }

    @Override
    public void atualizarCategoria(int id, String categoria) {
        var cat = categoriaRepository.getReferenceById(id);
        cat.setCategoria(categoria);
        categoriaRepository.save(cat);
    }

    @Override
    public Categoria criar(String categoria) {
        var cat = new Categoria();
        cat.setCategoria(categoria);
        return categoriaRepository.save(cat);
    }

    @Override
    public Categoria criar(String categoria, int pai) {
        var paiOptional = categoriaRepository.findById(pai);

        if (!paiOptional.isPresent()) {
            throw new EntidadeNaoEncontradaException("Categoria definida como pai não existe");
        }

        var catPai = paiOptional.get();

        var cat = new Categoria();
        cat.setCategoria(categoria);
        cat.setPai(catPai);
        return categoriaRepository.save(cat);

    }

    @Override
    public List<Categoria> recuperarPorNome(String nome) {
        return categoriaRepository.recuperarPorNome(nome);
    }
}

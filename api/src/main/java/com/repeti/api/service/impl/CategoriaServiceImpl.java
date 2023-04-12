package com.repeti.api.service.impl;
 
import java.util.List;

import com.repeti.api.model.Categoria;
import com.repeti.api.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.repeti.api.service.CategoriaService;

@Component
public class CategoriaServiceImpl  implements CategoriaService {
    
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

    @Override
    public Categoria getCategoriaByNome(String nome) {
        return categoriaRepository.findByCategoria(nome);
    }

    @Override
    public List<Categoria> getListCategoria() {
        return categoriaRepository.findAll();
    }

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
}

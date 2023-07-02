package com.repeti.api.service;

import java.util.List;

import com.repeti.api.model.Categoria;
import org.springframework.stereotype.Service;


@Service
public interface CategoriaService {

    public List<Categoria> recuperarPorNome(String nome);

    public Categoria saveCategoria(Categoria categoria);

    public Categoria criar(String categoria);
    public Categoria criar(String categoria, int pai);

    public void removeCategoria(String id);

    public void atualizarCategoria(int id, String categoria);

    // public Categoria getCategoriaByNome(String nome);

    public Categoria recuperarPorId(int id);

}

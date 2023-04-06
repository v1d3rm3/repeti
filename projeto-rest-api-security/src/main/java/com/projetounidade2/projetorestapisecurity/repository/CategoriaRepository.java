package com.projetounidade2.projetorestapisecurity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetounidade2.projetorestapisecurity.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {

    Categoria findByCategoria(String name);

}

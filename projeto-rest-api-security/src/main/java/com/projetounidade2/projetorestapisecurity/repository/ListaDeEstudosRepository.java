package com.projetounidade2.projetorestapisecurity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.projetounidade2.projetorestapisecurity.model.ListaDeEstudos;

public interface ListaDeEstudosRepository extends JpaRepository<ListaDeEstudos, Integer> {
    @Query(value = "SELECT a FROM ListaDeEstudos a WHERE a.usuario.id = :usuarioId")
    List<ListaDeEstudos> listar(@Param("usuarioId") int usuarioId);
}

package com.repeti.api.repository;

import java.util.List;

import com.repeti.api.model.ListaDeEstudos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ListaDeEstudosRepository extends JpaRepository<ListaDeEstudos, Integer> {
    @Query(value = "SELECT a FROM ListaDeEstudos a WHERE a.usuario.id = :usuarioId")
    List<ListaDeEstudos> listar(@Param("usuarioId") int usuarioId);
}

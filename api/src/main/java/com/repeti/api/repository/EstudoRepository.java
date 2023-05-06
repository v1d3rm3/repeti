package com.repeti.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.repeti.api.model.Estudo;

public interface EstudoRepository extends JpaRepository<Estudo, Integer> {
    @Query(value = "SELECT a FROM Estudo a WHERE a.usuario.id = :usuarioId AND a.desativado IS NULL")
    List<Estudo> listar(@Param("usuarioId") int usuarioId);
}

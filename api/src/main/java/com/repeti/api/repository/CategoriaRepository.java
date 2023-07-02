package com.repeti.api.repository;

import com.repeti.api.model.Categoria;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {

    @Query(value = "select * from categoria c "
            + " left join categoria cp on cp.id = c.pai_id "
            + "where c.categoria like concat('%', concat(:nome, '%'))", nativeQuery = true)

    List<Categoria> recuperarPorNome(@Param("nome") String nome);

}

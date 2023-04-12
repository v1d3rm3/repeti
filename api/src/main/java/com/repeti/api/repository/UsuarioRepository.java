package com.repeti.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.repeti.api.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    // @Query(value = "select * from usuario c where c.email = email and c.senha = senha LIMIT 1",nativeQuery = true)
    @Query(value = "SELECT u FROM Usuario u WHERE u.email = :email AND u.senha = :senha")
    List<Usuario> getUsuarioByLogin(@Param("email") String email, @Param("senha") String senha);

    Optional<Usuario> findByEmail(String email);
}

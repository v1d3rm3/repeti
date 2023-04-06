package com.projetounidade2.projetorestapisecurity.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetounidade2.projetorestapisecurity.model.Permissao;

public interface PermissaoRepository extends JpaRepository<Permissao, Long> {

    Optional<Permissao> findByNome(String nome);

}

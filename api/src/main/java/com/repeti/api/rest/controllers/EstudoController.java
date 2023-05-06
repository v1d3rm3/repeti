package com.repeti.api.rest.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.repeti.api.model.Estudo;
import com.repeti.api.model.Questao;
import com.repeti.api.rest.dto.estudo.CriarEstudoReqDto;
import com.repeti.api.service.EstudoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/estudo")
@RequiredArgsConstructor
public class EstudoController {

    private final EstudoService estudoService;

    @GetMapping
    public ResponseEntity<List<Estudo>> listar() {
        return ResponseEntity.ok(this.estudoService.recuperarEstudosDeUsuario());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Estudo> criar(@RequestBody @Valid CriarEstudoReqDto params) {
        return ResponseEntity.ok(estudoService.criar(params.getCategoria()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estudo> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(this.estudoService.recuperarEstudoPorId(id));
    }

    /**
     * Retorna a próxima questão para que o usuário possa fazê-la.
     * 
     * A próxima questão de um estudo dependente do
     * nível atual do estudo e da questão. No caso, os
     * níveis precisam ser os mesmos.
     * 
     * Além disso, a questão deve ser da mesma categoria, ou de
     * alguma das subcategorias escolhidas para o estudo.
     * 
     * E por último, dentro desse conjunto filtrado pelos dois
     * casos anteriores, a questão é escolhida aleatoriamente.
     * 
     * @return Questao A questão selecionada
     */
    @GetMapping("/{id}/proxima-questao")
    public ResponseEntity<Questao> proximaQuestao() {
        return null;
    }

    /**
     * Deixa de apresentar o estudo na listagem de estudos
     * do usuário. Isso significa que ele não poderá mais
     * utilizar o estudo para fazer questões.
     */
    @DeleteMapping("/{id}")
    public void pararEstudo(@PathVariable Integer id) {
        estudoService.pararEstudo(id);
    }

    // CASO USO: resolver questão

    // CASO USO: avaliar questão
    
}

package com.repeti.api.rest.controllers;

import java.util.List;

import javax.validation.Valid;

import com.repeti.api.model.ListaDeEstudos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.repeti.api.rest.dto.lista_de_estudos.AtualizarListaDeEstudosDto;
import com.repeti.api.rest.dto.lista_de_estudos.CriarListaDeEstudosDto;
import com.repeti.api.service.ListaDeEstudosService;

@RestController
@RequestMapping("api/lista-de-estudos")
public class ListaDeEstudosController {

    @Autowired
    ListaDeEstudosService service;

    @GetMapping
    public ResponseEntity<List<ListaDeEstudos>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @PostMapping("{listaId}/questao/{questaoId}")
    public void adicionarQuestao(@PathVariable("questaoId") String questaoId, @PathVariable("listaId") String listaId) {
        service.adicionarQuestao(Integer.parseInt(listaId), Integer.parseInt(questaoId));
    }

    @PostMapping
    public ResponseEntity<ListaDeEstudos> criar(@RequestBody @Valid CriarListaDeEstudosDto params) {
        return ResponseEntity.ok(service.criar(params));
    }

    @DeleteMapping("{id}")
    public void remover(@PathVariable("id") String id) {
        service.remover(Integer.parseInt(id));
    }

    @PatchMapping("{id}")
    public ResponseEntity<ListaDeEstudos> atualizar(@RequestBody @Valid AtualizarListaDeEstudosDto params,
            @PathVariable("id") String id) {
        return ResponseEntity.ok(service.atualizar(Integer.parseInt(id), params));
    }

}

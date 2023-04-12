package com.repeti.api.rest.controllers;

import java.util.List;

import javax.validation.Valid;

import com.repeti.api.model.Prova;
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

import com.repeti.api.rest.dto.AdicionarQuestaoDto;
import com.repeti.api.rest.dto.prova.AtualizarProvaDto;
import com.repeti.api.rest.dto.prova.CriarProvaDto;
import com.repeti.api.rest.dto.prova.ProvaDto;
import com.repeti.api.service.ProvaService;

@RestController
@RequestMapping("api/prova")
public class ProvaController {

    @Autowired
    ProvaService service;

    @PostMapping
    public ResponseEntity<Prova> criar(@RequestBody @Valid CriarProvaDto params) {
        return ResponseEntity.ok(service.criar(params.getNome()));
    }

    @GetMapping
    public ResponseEntity<List<ProvaDto>> listar() { 
        return ResponseEntity.ok(ProvaDto.from(service.listar()));
    }

    @GetMapping("{id}")
    public ResponseEntity<ProvaDto> recuperarPorId(@PathVariable("id") String id) {
        return ResponseEntity.ok(ProvaDto.from(service.recuperarPorId(Integer.parseInt(id))));
    }

    @PatchMapping
    public ResponseEntity<Prova> atualizar(@RequestBody @Valid AtualizarProvaDto params) {
        return ResponseEntity.ok(service.atualizar(params.getId(), params.getNome()));
    }

    @PostMapping("{id}/questao")
    public void adicionarQuestao(@PathVariable("id") String id, @RequestBody @Valid AdicionarQuestaoDto params) {  
        service.adicionarQuestao(Integer.parseInt(id), params.getQuestaoId());
    }

    @DeleteMapping("{id}")
    public void remover(@PathVariable("id") String id) {
        service.remover(Integer.parseInt(id));
    }

}

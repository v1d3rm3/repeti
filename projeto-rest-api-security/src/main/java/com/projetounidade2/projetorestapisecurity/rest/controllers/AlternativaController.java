package com.projetounidade2.projetorestapisecurity.rest.controllers;

import java.util.List;

import javax.validation.Valid;

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

import com.projetounidade2.projetorestapisecurity.model.Alternativa;
import com.projetounidade2.projetorestapisecurity.rest.dto.AlternativaDto;
import com.projetounidade2.projetorestapisecurity.rest.dto.alternativa.CriarAlternativaDto;
import com.projetounidade2.projetorestapisecurity.service.AlternativaService;

@RestController
@RequestMapping("api/alternativa")
public class AlternativaController {

    @Autowired
    AlternativaService service;

    @GetMapping("questao/{id}")
    public ResponseEntity<List<AlternativaDto>> listarPorQuestaoId(@PathVariable("id") String id) {
        List<Alternativa> res = service.listarPorQuestaoId(Integer.parseInt(id));
        var list = res.stream().map(a -> AlternativaDto.from(a)).toList();
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<AlternativaDto> criar(@RequestBody @Valid CriarAlternativaDto params) {
        var alternativa = service.criar(params);
        return ResponseEntity.ok(AlternativaDto.from(alternativa));
    }

    @PatchMapping("{id}")
    public ResponseEntity<AlternativaDto> atualizar(@PathVariable("id") String id,
            @RequestBody @Valid CriarAlternativaDto params) {
        var alternativa = service.atualizar(Integer.parseInt(id), params.getAlternativa());
        return ResponseEntity.ok(AlternativaDto.from(alternativa));
    }

    @DeleteMapping("{id}")
    public void atualizar(@PathVariable("id") String id) {
        service.remover(Integer.parseInt(id));
    }

}

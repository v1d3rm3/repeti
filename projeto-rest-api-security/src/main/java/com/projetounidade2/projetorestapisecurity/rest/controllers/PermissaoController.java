package com.projetounidade2.projetorestapisecurity.rest.controllers;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

import com.projetounidade2.projetorestapisecurity.model.Permissao;
import com.projetounidade2.projetorestapisecurity.rest.dto.PermissaoDTO;
import com.projetounidade2.projetorestapisecurity.rest.form.PermissaoForm;
import com.projetounidade2.projetorestapisecurity.service.PermissaoService;

@RestController
@RequestMapping("api/permissoes")
public class PermissaoController {

    @Autowired
    PermissaoService permissaoService;

    @GetMapping
    public List<PermissaoDTO> find() {
        List<Permissao> permissoes = permissaoService.getListPermissao();
        return PermissaoDTO.converter(permissoes);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<PermissaoDTO> save(@RequestBody @Valid PermissaoForm form, UriComponentsBuilder uriBuilder) {
        Permissao permissao = form.converter();
        permissaoService.savePermissao(permissao);

        URI uri = uriBuilder.path("/permissoes/{id}").buildAndExpand(permissao.getId()).toUri();
        return ResponseEntity.created(uri).body(new PermissaoDTO(permissao));
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable Long id, @RequestBody PermissaoForm form) {
        try {
            Permissao permissao = form.converter();
            permissaoService.atualizarPermissao(id, permissao.getNome());
        } catch (Exception e) {
           throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Permissao não encontrada");
        }
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable Long id) {
        try {
            permissaoService.removePermissao(id);
        } catch (Exception e) {
           throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Permissao não encontrada");
        }
    }

}

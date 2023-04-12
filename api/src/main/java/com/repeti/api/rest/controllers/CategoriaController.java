package com.repeti.api.rest.controllers;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.repeti.api.model.Categoria;
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

import com.repeti.api.rest.dto.CategoriaDTO;
import com.repeti.api.rest.dto.categoria.CategoriaCompletaDTO;
import com.repeti.api.rest.form.CategoriaForm;
import com.repeti.api.service.CategoriaService;

@RestController
@RequestMapping("api/categorias")
public class CategoriaController {

    @Autowired
    CategoriaService categoriaService;

    @GetMapping
    public List<CategoriaCompletaDTO> find() {
        List<CategoriaCompletaDTO> a = new ArrayList<CategoriaCompletaDTO>();
        for (Categoria cat : categoriaService.getListCategoria()) {
            a.add(new CategoriaCompletaDTO(cat));
        }
        return a;
    }

    @GetMapping("{id}")
    public CategoriaCompletaDTO getById(@PathVariable Integer id) {
        return new CategoriaCompletaDTO(categoriaService.recuperarPorId(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<CategoriaDTO> save(@RequestBody @Valid CategoriaForm form, UriComponentsBuilder uriBuilder) {
        Categoria categoria = form.converter();
        categoriaService.saveCategoria(categoria);

        URI uri = uriBuilder.path("/categorias/{id}").buildAndExpand(categoria.getId()).toUri();
        return ResponseEntity.created(uri).body(new CategoriaDTO(categoria));
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable Integer id,
                       @RequestBody Categoria categoria) {
        try {
            categoriaService.atualizarCategoria(id, categoria.getCategoria());
        } catch (Exception e) {
           throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada");
        }
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable String id) {
        try {
            categoriaService.removeCategoria(id);
        } catch (Exception e) {
           throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada");
        }
    }

}

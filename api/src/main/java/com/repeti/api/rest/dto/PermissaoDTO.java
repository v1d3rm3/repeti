package com.repeti.api.rest.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.repeti.api.model.Permissao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PermissaoDTO {

    private Long id;
    private String nome;

    public PermissaoDTO(Permissao permissao) {
        this.id = permissao.getId();
        this.nome = permissao.getNome();
    }

    public static List<PermissaoDTO> converter(List<Permissao> permissoes) {
        return permissoes.stream().map(PermissaoDTO::new).collect(Collectors.toList());
    }
}

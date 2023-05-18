package com.repeti.api.rest.form;

import java.util.List;
import java.util.stream.Collectors;

import com.repeti.api.model.Usuario;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioForm {

    private String nome;
    private String senha;
    private String email;

    public UsuarioForm(Usuario usuario) {
        this.nome = usuario.getNome();
        this.senha = usuario.getPassword();
        this.email = usuario.getEmail();
    }

    public static List<UsuarioForm> converter(List<Usuario> listUsuario) {
        return listUsuario.stream().map(UsuarioForm::new).collect(Collectors.toList());
    }

    public static UsuarioForm converter(Usuario usuario) {
        UsuarioForm dto = new UsuarioForm(usuario);
        return dto;
    }

    public Usuario toUsuario() {
        Usuario usuario = new Usuario();
        usuario.setEmail(this.email);
        usuario.setNome(this.nome);
        usuario.setSenha(this.senha);
        return usuario;
    }
}
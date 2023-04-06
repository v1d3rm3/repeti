package com.projetounidade2.projetorestapisecurity.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.projetounidade2.projetorestapisecurity.model.Permissao;
import com.projetounidade2.projetorestapisecurity.model.Usuario;


@Service
public interface UsuarioService extends UserDetailsService {
    
    public Usuario salvar(Usuario usuario);

    public void removeUsuario(Usuario usuario);

    public Usuario getUsuarioById(Integer id);

    public Usuario findByEmail(String email);

    public List<Usuario> getListUsuario();

    public Usuario atribuirPermissao(Integer id, Permissao permissao);    

    public Usuario atribuirPermissaoPorEmail(String email, Permissao permissao); 

    public UserDetails autenticar(Usuario usuario);

    public Boolean isEmailNotUsed(Usuario usuario);

}

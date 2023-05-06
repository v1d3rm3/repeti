package com.repeti.api.service.impl;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.repeti.api.exception.RegraNegocioException;
import com.repeti.api.exception.SenhaInvalidaException;
import com.repeti.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.repeti.api.model.Usuario;
import com.repeti.api.service.UsuarioService;

@Component
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    public PasswordEncoder passwordEncoder;

    @Autowired
    private UsuarioRepository repository;

    @Transactional
    @Override
    public Usuario salvar(Usuario usuario) {
        return repository.save(usuario);
    }

    @Override
    public Boolean isEmailNotUsed(Usuario usuario) {
        Optional<Usuario> a = repository.findByEmail(usuario.getEmail());
        if(!a.isPresent()){
            return true;
        }
        throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Email já Cadastrado");
    }

    @Override
    public UserDetails autenticar( Usuario usuario ){
        UserDetails user = loadUserByUsername(usuario.getEmail());
        boolean senhasBatem = passwordEncoder.matches( usuario.getSenha(), user.getPassword() );

        if(senhasBatem){
            return user;
        }

        throw new SenhaInvalidaException();
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Usuario> usuario = repository.findByEmail(email);
		if (usuario.isPresent()) {
			return usuario.get();
		}
		
		throw new UsernameNotFoundException("Dados inválidos!");
    }

    @Override
    public Usuario findByEmail(String email) {
        Optional<Usuario> usuario = repository.findByEmail(email);
		if (usuario.isPresent()) {
			return usuario.get();
		}
		
		throw new RegraNegocioException("Dados inválidos!");
    }

    @Override
    public void removeUsuario(Usuario usuario) {
        repository.delete(usuario);
    }

    @Override
    public Usuario getUsuarioById(Integer id) {
        return repository
                    .findById(id)
                    .map(user -> {
                        return user;
                    })
                    .orElseThrow(
                        () -> new RegraNegocioException("Usuário " + id + " não foi encontrado")
                    );
    }

    @Override
    public List<Usuario> getListUsuario() {
        return repository.findAll();
    }

}

package com.repeti.api.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "usuario")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    @NotEmpty
    private String nome;

    @Column
    @NotEmpty
    private String email;

    @Column
    @NotEmpty
    private String senha;

    @OneToMany(fetch = FetchType.LAZY)
    private List<ListaDeEstudos> listaDeEstudos;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Permissao> permissoes;

    public Usuario() {
        this.permissoes = new ArrayList<Permissao>();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        System.out.println(this.permissoes);
        return this.permissoes;
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public boolean setPermissao(Permissao permissao) {
        return this.permissoes.add(permissao);
    }

}

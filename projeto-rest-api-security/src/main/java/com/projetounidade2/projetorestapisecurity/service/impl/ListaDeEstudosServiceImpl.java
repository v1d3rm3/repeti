package com.projetounidade2.projetorestapisecurity.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.projetounidade2.projetorestapisecurity.model.ListaDeEstudos;
import com.projetounidade2.projetorestapisecurity.model.Usuario;
import com.projetounidade2.projetorestapisecurity.repository.ListaDeEstudosRepository;
import com.projetounidade2.projetorestapisecurity.repository.QuestaoRepository;
import com.projetounidade2.projetorestapisecurity.repository.UsuarioRepository;
import com.projetounidade2.projetorestapisecurity.rest.dto.lista_de_estudos.AtualizarListaDeEstudosDto;
import com.projetounidade2.projetorestapisecurity.rest.dto.lista_de_estudos.CriarListaDeEstudosDto;
import com.projetounidade2.projetorestapisecurity.service.ListaDeEstudosService;

@Component
public class ListaDeEstudosServiceImpl implements ListaDeEstudosService {

    @Autowired
    ListaDeEstudosRepository listaDeEstudosRepository;

    @Autowired
    QuestaoRepository questaoRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    public void remover(int id) {
        var usuarioId = 1; // TODO: recuperação de usuário da sessão

        var listaDeEstudos = listaDeEstudosRepository.findById(id);

        if (!listaDeEstudos.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Lista de Estudos não existe");
        }

        var listaDeEstudosFinal = listaDeEstudos.get();

        if (listaDeEstudosFinal.getUsuario().getId() != usuarioId) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário não pode remover esta lista");
        }

        listaDeEstudosRepository.delete(listaDeEstudosFinal);
    }

    @Override
    public List<ListaDeEstudos> listar() {
        var usuarioId = this._recuperarUsuario().getId();
        return listaDeEstudosRepository.listar(usuarioId);
    }

    @Override
    public void adicionarQuestao(int listaId, int questaoId) {
        var questaoOpcional = questaoRepository.findById(questaoId);

        if (!questaoOpcional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Questão não existe");
        }

        var listaOpcional = listaDeEstudosRepository.findById(listaId);

        if (!listaOpcional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Lista de Estudos não existe");
        }

        var lista = listaOpcional.get();
        
        lista.getQuestoes().add(questaoOpcional.get());

        listaDeEstudosRepository.save(lista);      
    }

    @Override
    public ListaDeEstudos criar(CriarListaDeEstudosDto params) {
        var usuario = this._recuperarUsuario();
        var lista = new ListaDeEstudos();
        lista.setNome(params.getNome());
        lista.setUsuario(usuario);
        return listaDeEstudosRepository.save(lista);
    }

    @Override
    public ListaDeEstudos atualizar(int id, AtualizarListaDeEstudosDto params) {
        var listaOpcional = listaDeEstudosRepository.findById(id);
        if (!listaOpcional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Lista de Estudos não existe");
        }
        var lista = listaOpcional.get();

        lista.setNome(params.getNome());
        return listaDeEstudosRepository.save(lista);
    }

    @Override
    public ListaDeEstudos recuperarPorId(int id) {
        var listaOpcional = listaDeEstudosRepository.findById(id);
        if (!listaOpcional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Lista de Estudos não existe");
        }
        return listaOpcional.get();
    }

    private Usuario _recuperarUsuario() {
        var email = SecurityContextHolder.getContext().getAuthentication().getName();
        var usuario = usuarioRepository.findByEmail(email);

        if (!usuario.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário não está logado?");
        }
        return usuario.get(); 
    }
}

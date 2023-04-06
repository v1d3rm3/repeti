package com.projetounidade2.projetorestapisecurity.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.projetounidade2.projetorestapisecurity.model.ListaDeEstudos;
import com.projetounidade2.projetorestapisecurity.rest.dto.lista_de_estudos.AtualizarListaDeEstudosDto;
import com.projetounidade2.projetorestapisecurity.rest.dto.lista_de_estudos.CriarListaDeEstudosDto;

@Service
public interface ListaDeEstudosService {
    public ListaDeEstudos criar(CriarListaDeEstudosDto params);
    public ListaDeEstudos atualizar(int id, AtualizarListaDeEstudosDto params);
    public ListaDeEstudos recuperarPorId(int id);
    public void remover(int id);
    /**
     * Lista todas as "listas de estudo" do usuário logado
     * @return
     */
    public List<ListaDeEstudos> listar();
    public void adicionarQuestao(int listaId, int questaoId);
}

package com.repeti.api.service;

import java.util.List;

import com.repeti.api.model.ListaDeEstudos;
import com.repeti.api.rest.dto.lista_de_estudos.AtualizarListaDeEstudosDto;
import com.repeti.api.rest.dto.lista_de_estudos.CriarListaDeEstudosDto;
import org.springframework.stereotype.Service;

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

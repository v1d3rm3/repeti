package com.repeti.api.service.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.repeti.api.exception.EntidadeNaoEncontradaException;
import com.repeti.api.exception.RegraNegocioException;
import com.repeti.api.model.Categoria;
import com.repeti.api.model.Estudo;
import com.repeti.api.model.Nivel;
import com.repeti.api.model.Questao;
import com.repeti.api.repository.CategoriaRepository;
import com.repeti.api.repository.EstudoRepository;
import com.repeti.api.repository.QuestaoEstudadaRepository;
import com.repeti.api.repository.QuestaoRepository;
import com.repeti.api.repository.UsuarioRepository;
import com.repeti.api.service.EstudoService;

@Component
public class EstudoServiceImpl implements EstudoService {

    @Autowired
    EstudoRepository estudoRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    CategoriaRepository categoriaRepository;

    @Autowired
    QuestaoRepository questaoRepository;

    @Autowired
    QuestaoEstudadaRepository questaoEstudadaRepository;

    @Override
    public List<Estudo> recuperarEstudosDeUsuario() {
        var email = SecurityContextHolder.getContext().getAuthentication().getName();
        var usuario = usuarioRepository.findByEmail(email).get();
        return this.estudoRepository.listar(usuario.getId());
    }

    @Override
    public Estudo recuperarEstudoPorId(int id) {
        var optionalEstudo = this.estudoRepository.findById(id);

        if (!optionalEstudo.isPresent()) {
            throw new EntidadeNaoEncontradaException("Estudo não existe");
        }

        var estudo = optionalEstudo.get();

        // verifica se estudo está ativo
        if (estudo.getDesativado() != null) {
            throw new RegraNegocioException("Este estudo já foi encerrado");
        }

        return estudo;
    }

    @Override
    public Estudo criar(int categoriaId) {
        var categoriaOptional = categoriaRepository.findById(categoriaId);
        if (!categoriaOptional.isPresent()) {
            throw new EntidadeNaoEncontradaException("Categoria não existe");
        }
        var estudo = new Estudo();
        estudo.setCategoria(categoriaOptional.get());
        estudo.setNivelAtual(Nivel.MuitoFacil);

        var email = SecurityContextHolder.getContext().getAuthentication().getName();
        var usuario = usuarioRepository.findByEmail(email).get();
        estudo.setUsuario(usuario);

        return estudoRepository.save(estudo);
    }

    @Override
    public void pararEstudo(int estudoId) {
        var email = SecurityContextHolder.getContext().getAuthentication().getName();
        var usuario = usuarioRepository.findByEmail(email).get();

        // verificar se estudo existe
        var estudoOptional = estudoRepository.findById(estudoId);

        if (!estudoOptional.isPresent()) {
            throw new EntidadeNaoEncontradaException("Estudo não existe.");
        }

        var estudo = estudoOptional.get();

        // estudo já foi encerrado?
        if (estudo.getDesativado() != null) {
            throw new RegraNegocioException("O estudo já foi encerrado anteriormente");
        }

        // verificar se usuário é dono do estudo
        if (estudo.getUsuario().getId() != usuario.getId()) {
            throw new RegraNegocioException("O usuário não criou este estudo");
        }

        estudo.setDesativado(new Timestamp(System.currentTimeMillis()));

        estudoRepository.save(estudo);
    }

    /**
     * Retorna a próxima questão para que o usuário possa fazê-la.
     * 
     * A próxima questão de um estudo dependente do
     * nível atual do estudo e da questão. No caso, os
     * níveis precisam ser os mesmos.
     * 
     * Além disso, a questão deve ser da mesma categoria, ou de
     * alguma das subcategorias escolhidas para o estudo.
     * 
     * E por último, dentro desse conjunto filtrado pelos dois
     * casos anteriores, a questão é escolhida aleatoriamente.
     * 
     * @return Questao A questão selecionada
     */
    @Override
    public Questao proximaQuestao(int estudoId) {
        var email = SecurityContextHolder.getContext().getAuthentication().getName();
        var usuario = usuarioRepository.findByEmail(email).get();

        var estudoOptional = estudoRepository.findById(estudoId);

        if (!estudoOptional.isPresent()) {
            throw new EntidadeNaoEncontradaException("Estudo não existe.");
        }

        var estudo = estudoOptional.get();

        // verificar se usuário é dono do estudo
        if (estudo.getUsuario().getId() != usuario.getId()) {
            throw new RegraNegocioException("O usuário não criou este estudo");
        }

        var categorias_s = recuperarTodasAsCategorias(estudo.getCategoria());
        var categoriasIds = new ArrayList<Integer>();

        for (Categoria c : categorias_s) {
            categoriasIds.add(c.getId());
        }

        var questoes = questaoRepository.recuperarQuestoesPorNivelECategoria(estudo.getNivelAtual(), categoriasIds);

        // 1. eliminar as questões já estudadas
        var questoesJaEstudadas = questaoEstudadaRepository.recuperarQuestaoEstudadasPorEstudo(estudoId,
                estudo.getNivelAtual());

        for (Questao q : questoes) {
            var jaFoiFeita = questoesJaEstudadas.stream().anyMatch(qe -> qe.getQuestao().getId() == q.getId());
            if (jaFoiFeita) {
                questoes.remove(q);
            }
        }

        // 2. caso não haja mais questões para estudar? Próximo nível, como fazer isso?
        if (questoes.size() <= 0) {
            if (estudo.getNivelAtual() == Nivel.MuitoDificil) {
                return null;
            } else {
                estudo.setNivelAtual(proximoNivel(estudo.getNivelAtual()));
                estudoRepository.save(estudo);
                return proximaQuestao(estudo.getId());
            }
        }

        // 3. se tiver questoes, sortear uma e retornar.
        Random rand = new Random();
        int i = rand.nextInt(questoes.size());

        return questoes.get(i);
    }

    private Nivel proximoNivel(Nivel nivel) {
        if (nivel == Nivel.MuitoFacil) {
            return Nivel.Facil;
        } else if (nivel == Nivel.Facil) {
            return Nivel.Mediana;
        } else if (nivel == Nivel.Mediana) {
            return Nivel.Dificil;
        } else {
            return Nivel.MuitoDificil;
        }
    }

    /**
     * Gera uma lista com a categoria passada por parâmetro mais
     * todas as subcategorias (até as folhas) da categoria.
     * 
     * @param categoria
     * @return
     */
    private List<Categoria> recuperarTodasAsCategorias(Categoria categoria) {
        var arr = new ArrayList<Categoria>();

        arr.add(categoria);

        if (categoria.getSubCategorias().size() > 0) {
            for (Categoria c : categoria.getSubCategorias()) {
                var arr_r = recuperarTodasAsCategorias(c);
                arr.addAll(arr_r);
            }
        }

        return arr;
    }

}

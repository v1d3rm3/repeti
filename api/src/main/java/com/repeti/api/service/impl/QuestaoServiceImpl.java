package com.repeti.api.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.repeti.api.exception.EntidadeNaoEncontradaException;
import com.repeti.api.model.Categoria;
import com.repeti.api.model.Nivel;
import com.repeti.api.model.Qualidade;
import com.repeti.api.model.Questao;
import com.repeti.api.model.QuestaoEstudada;
import com.repeti.api.repository.QuestaoEstudadaRepository;
import com.repeti.api.repository.QuestaoRepository;
import com.repeti.api.repository.UsuarioRepository;
import com.repeti.api.rest.dto.estudo.AvaliarQuestaoEstudadaReqDto;
import com.repeti.api.service.QuestaoService;

@Component
public class QuestaoServiceImpl implements QuestaoService {
    @Autowired
    QuestaoRepository questaoRepository;

    @Autowired
    QuestaoEstudadaRepository questaoEstudadaRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    public Questao saveQuestao(Questao questao) {
        questao.setNivel(Nivel.MuitoFacil);
        questao.setQualidade(Qualidade.Mediana);
        return questaoRepository.save(questao);
    }

    @Override
    public void removeQuestao(String id) {
        questaoRepository.deleteById(Integer.parseInt(id));
    }

    @Override
    public Questao getQuestaoById(Integer id) {
        return questaoRepository.getReferenceById(id);
    }

    public void definirCategoria(Questao questao, Categoria categoria) {
        questao.setCategoria(categoria);
        questaoRepository.save(questao);
    }

    @Override
    public List<Questao> getListQuestao() {

        return questaoRepository.findAll();
    }

    public void atualizarQuestaoEnunciado(int id, String enunciado) {
        var cat = questaoRepository.getReferenceById(id);
        cat.setEnunciado(enunciado);
        questaoRepository.save(cat);
    }

    @Override
    public QuestaoEstudada avaliarQuestaoEstuda(String usuarioEmail, AvaliarQuestaoEstudadaReqDto params) {
        var usuario = usuarioRepository.findByEmail(usuarioEmail).get();
        var questaoEstudadaOptional = questaoEstudadaRepository.findById(params.getQuestaoEstudadaId());

        if (!questaoEstudadaOptional.isPresent()) {
            throw new EntidadeNaoEncontradaException("Questão estudada não existe");          
        }

        // acho que não irei verificar se ela já foi avaliada ou não.
        // é meio que uma operação idempotente. não vai alterar o resultado final.
        var questaoEstudada = questaoEstudadaOptional.get();

        // questao estudada é do usuário?
        if (usuario.getId() != questaoEstudada.getUsuario().getId()) {
            // TODO: ...
        }

        questaoEstudada.setNivel(params.getNivel());
        questaoEstudada.setQualidade(params.getQualidade());

        questaoEstudadaRepository.save(questaoEstudada);

        // TODO: atualizar avaliações na questão!

        return questaoEstudada;
    }
}
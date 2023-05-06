package com.repeti.api.rest.controllers;

import java.util.List;
import java.net.URI;

import javax.validation.Valid;

import com.repeti.api.model.Categoria;
import com.repeti.api.model.Questao;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

import com.repeti.api.exception.RegraNegocioException;
import com.repeti.api.model.Alternativa;
import com.repeti.api.rest.dto.AlternativaDto;
import com.repeti.api.rest.dto.CategoriaDTO;
import com.repeti.api.rest.dto.QuestaoDto;
import com.repeti.api.rest.dto.questao.QuestaoCompletaDTO;
import com.repeti.api.rest.dto.questao.RespostaQuestaoDto;
import com.repeti.api.rest.form.QuestaoForm;
import com.repeti.api.service.AlternativaService;
import com.repeti.api.service.CategoriaService;
import com.repeti.api.service.QuestaoService;
import lombok.*;

@RestController
@RequestMapping("api/questoes")
@RequiredArgsConstructor
public class QuestaoController {
    private final QuestaoService questaoService;
    private final CategoriaService categoriaService;
    private final AlternativaService alternativaService;

    @GetMapping
    public ResponseEntity<List<QuestaoCompletaDTO>> listarQuestoes() {
        List<Questao> res = questaoService.getListQuestao();
        var list = res.stream().map(a -> QuestaoCompletaDTO.from(a)).toList();
        return ResponseEntity.ok(list);
    }

    @GetMapping("{id}")
    public ResponseEntity<QuestaoCompletaDTO> recuperarPorId(@PathVariable Integer id) {
        List<Alternativa> alternativas = alternativaService.listarPorQuestaoId(id);
        Questao q = questaoService.getQuestaoById(id);
        q.setAlternativas(alternativas);
        questaoService.saveQuestao(q);
        return ResponseEntity.ok(QuestaoCompletaDTO.from(q));
    }

    @PatchMapping("{id}")
    public void atualizar(@PathVariable Integer id, @RequestBody QuestaoDto categoria) {
        questaoService.atualizarQuestaoEnunciado(id, categoria.getEnunciado());
    }

    @PutMapping("{id}/categoria")
    public ResponseEntity<QuestaoCompletaDTO> updateCategoria(@PathVariable Integer id,
            @RequestBody CategoriaDTO categoria) {
        try {
            Categoria cat = categoriaService.getCategoriaByNome(categoria.getCategoria());
            Questao q = questaoService.getQuestaoById(id);

            if (cat == null) {
                throw new RegraNegocioException("Alternativa nao encontrada");
            }
            if (q == null) {
                throw new RegraNegocioException("Questao nao encontrada");
            }
            q.setCategoria(cat);
            questaoService.saveQuestao(q);
            return ResponseEntity.ok(QuestaoCompletaDTO.from(q));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nao encontrado");
        }
    }

    @PutMapping("{id}/categoria/remover")
    public ResponseEntity<QuestaoCompletaDTO> removerCategoriaDeQuestao(@PathVariable Integer id) {
        try {
            Questao q = questaoService.getQuestaoById(id);
            q.setCategoria(null);
            questaoService.saveQuestao(q);
            return ResponseEntity.ok(QuestaoCompletaDTO.from(q));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Questão não encontrada");
        }
    }

    @PostMapping("{id}/resposta")
    public ResponseEntity<RespostaQuestaoDto> checarResposta(@PathVariable Integer id,
            @RequestBody AlternativaDto alternativa) {
        try {
            Alternativa alt = alternativaService.recuperarPorId(alternativa.getId());
            Questao q = questaoService.getQuestaoById(id);

            RespostaQuestaoDto respostaDto = new RespostaQuestaoDto();
            respostaDto.setStatus(q.checarResposta(alt.getId()));
            respostaDto.setResposta(q.getResposta().getId());

            return ResponseEntity.ok(respostaDto);

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Alternativa não encontrada");
        }
    }

    @PutMapping("{id}/resposta")
    public ResponseEntity<QuestaoCompletaDTO> update(@PathVariable Integer id,
            @RequestBody AlternativaDto alternativa) {
            Alternativa alt = alternativaService.recuperarPorId(alternativa.getId());
            List<Alternativa> alternativas = alternativaService.listarPorQuestaoId(id);
            Questao q = questaoService.getQuestaoById(id);
            q.setAlternativas(alternativas);
            q.setResposta(alt);
            questaoService.saveQuestao(q);
            return ResponseEntity.ok(QuestaoCompletaDTO.from(q));
    }

    @PutMapping("{id}/alternativa")
    public ResponseEntity<QuestaoCompletaDTO> updateAlternativas(@PathVariable Integer id,
            @RequestBody AlternativaDto alternativa) {
        try {
            Alternativa alt = alternativaService.recuperarPorId(alternativa.getId());
            Questao q = questaoService.getQuestaoById(id);

            List<Alternativa> list = q.getAlternativas();
            if (list.add(alt)) {
                q.setAlternativas(list);
                questaoService.saveQuestao(q);
                return ResponseEntity.ok(QuestaoCompletaDTO.from(q));
            } else {
                throw new RegraNegocioException("List não atualizada");
            }

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Alternativa não encontrada");
        }
    }

    @PutMapping("{id}/categoria/{categoriaId}")
    public ResponseEntity<String> definirCategoria(@PathVariable Integer id,
            @PathVariable Integer categoriaId) {
        try {
            Questao q = questaoService.getQuestaoById(id);
            Categoria c = categoriaService.recuperarPorId(categoriaId);

            questaoService.definirCategoria(q, c);

            return ResponseEntity.ok("{}");

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Alternativa não encontrada");
        }
    }

    @PutMapping("{id}/alternativa/remover")
    public ResponseEntity<QuestaoCompletaDTO> removeAlternativasDaQuestao(@PathVariable Integer id,
            @RequestBody AlternativaDto alternativa) {
        try {
            Alternativa alt = alternativaService.recuperarPorId(alternativa.getId());

            Questao q = questaoService.getQuestaoById(id);

            List<Alternativa> list = q.getAlternativas();
            if (alt != null) {
                list.remove(alt);
                q.setAlternativas(list);
                questaoService.saveQuestao(q);

                if (q.getResposta() == alt) {
                    q.setResposta(null);
                }

                alternativaService.remover(alt.getId());

                return ResponseEntity.ok(QuestaoCompletaDTO.from(q));
            }

            throw new RegraNegocioException("List não atualizada");
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Alternativa não encontrada");
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<QuestaoDto> save(@RequestBody @Valid QuestaoForm form, UriComponentsBuilder uriBuilder) {
        Questao questao = form.converter();
        questaoService.saveQuestao(questao);

        URI uri = uriBuilder.path("/questoes/{id}").buildAndExpand(questao.getId()).toUri();
        return ResponseEntity.created(uri).body(new QuestaoDto(questao));
    }

    @DeleteMapping("{id}")
    public void remover(@PathVariable("id") String id) {
        try {
            questaoService.removeQuestao(id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Questao não encontrada");
        }

    }
}

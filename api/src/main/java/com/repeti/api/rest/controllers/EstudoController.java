package com.repeti.api.rest.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.repeti.api.model.Estudo;
import com.repeti.api.model.Questao;
import com.repeti.api.model.QuestaoEstudada;
import com.repeti.api.rest.dto.AlternativaDto;
import com.repeti.api.rest.dto.estudo.CriarEstudoReqDto;
import com.repeti.api.rest.dto.estudo.EstudoResDTO;
import com.repeti.api.rest.dto.questao.RespostaQuestaoDto;
import com.repeti.api.service.EstudoService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/estudo")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearer-key")
public class EstudoController {

    private final EstudoService estudoService;

    @GetMapping
    public ResponseEntity<List<EstudoResDTO>> listar() {
        List<Estudo> estudo = estudoService.recuperarEstudosDeUsuario();
        return ResponseEntity.ok(EstudoResDTO.from(estudo));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<EstudoResDTO> criar(@RequestBody @Valid CriarEstudoReqDto params) {
        Estudo estudo = estudoService.criar(params.getCategoria());
        return ResponseEntity.ok(EstudoResDTO.from(estudo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EstudoResDTO> findById(@PathVariable Integer id) {
        Estudo estudo = this.estudoService.recuperarEstudoPorId(id);
        return ResponseEntity.ok(EstudoResDTO.from(estudo));
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
    @GetMapping("/{id}/proxima-questao")
    public ResponseEntity<Questao> proximaQuestao(@PathVariable Integer id) {
        return ResponseEntity.ok(estudoService.proximaQuestao(id));
    }

    /**
     * Deixa de apresentar o estudo na listagem de estudos
     * do usuário. Isso significa que ele não poderá mais
     * utilizar o estudo para fazer questões.
     */
    @DeleteMapping("/{id}")
    public void pararEstudo(@PathVariable Integer id) {
        estudoService.pararEstudo(id);
    }

    // CASO USO: resolver questão
    @PostMapping("/{estudoId}/questao/{questaoId}/resolver")
    public ResponseEntity<RespostaQuestaoDto> resolver(@PathVariable Integer estudoId,@PathVariable Integer questaoId, @RequestBody AlternativaDto alternativa) {
        QuestaoEstudada questaoEstudada = estudoService.resolver(questaoId, alternativa.getId(), estudoId);

        RespostaQuestaoDto respostaDto = new RespostaQuestaoDto();

        return ResponseEntity.ok(respostaDto.converter(questaoEstudada));
    }


    // CASO USO: avaliar questão

}

package com.repeti.api.rest.dto.estudo;

import javax.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RecuperarEstudosPorUsuarioDto {
    @NotBlank(message = "Campo 'usuarioId' não pode ser vazio")
    int usuarioId;
}

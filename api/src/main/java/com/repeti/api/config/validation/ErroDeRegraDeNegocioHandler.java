package com.repeti.api.config.validation;

import java.util.ArrayList;
import java.util.List;

import com.repeti.api.exception.RegraNegocioException;
import com.repeti.api.rest.dto.ErroDTO;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErroDeRegraDeNegocioHandler {

    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(RegraNegocioException.class)
    public List<ErroDTO> handle(RegraNegocioException e) {

        List<ErroDTO> dto = new ArrayList<>();
                ErroDTO erro = new ErroDTO(e.getMessage());
                dto.add(erro);

        return dto;
    }
}
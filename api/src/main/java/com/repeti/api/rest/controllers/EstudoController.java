package com.repeti.api.rest.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;

import com.repeti.api.model.Estudo;
import com.repeti.api.rest.dto.estudo.CriarEstudoReqDto;
import com.repeti.api.service.EstudoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/estudo")
@RequiredArgsConstructor
public class EstudoController {

    private final EstudoService estudoService;

    @GetMapping
    public ResponseEntity<List<Estudo>> listar() {
        return ResponseEntity.ok(this.estudoService.recuperarEstudosDeUsuario());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Estudo> salvar(@RequestBody @Valid CriarEstudoReqDto params) {
        return ResponseEntity.ok(estudoService.criar(params.getCategoria()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estudo> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(this.estudoService.recuperarEstudoPorId(id));
    }

    // private final UsuarioService usuarioService;
    // private final PermissaoService permissaoService;
    // private final PasswordEncoder passwordEncoder;
    // private final JwtService jwtService;

    // @GetMapping
    // public List<Estudo> recuperarEstudosDeUsuario(RecuperarEstudosPorUsuarioDto
    // params) {

    // }

    // @GetMapping
    // public List<UsuarioDTO> find() {
    // return UsuarioDTO.converter(usuarioService.getListUsuario());
    // }

    // @GetMapping("/{id}")
    // public UsuarioDTO findById(@PathVariable Integer id) {
    // Usuario usuario = usuarioService.getUsuarioById(id);
    // return UsuarioDTO.converter(usuario);
    // }

    // @GetMapping("/info")
    // public Usuario info(Principal principal) {
    // Usuario usuario = usuarioService.findByEmail(principal.getName());
    // return usuario;
    // }

    // @PostMapping
    // @ResponseStatus(HttpStatus.CREATED)
    // public UsuarioDTO salvar( @RequestBody @Valid Usuario usuario ) {

    // if(usuarioService.isEmailNotUsed(usuario)){
    // String senhaCriptografada = passwordEncoder.encode(usuario.getSenha());
    // usuario.setSenha(senhaCriptografada);
    // return UsuarioDTO.converter(usuarioService.salvar(usuario));
    // }
    // return new UsuarioDTO();
    // }

    // @PostMapping("/auth")
    // public TokenDTO autenticar(@RequestBody LoginForm credenciais){
    // try{
    // Usuario usuario = Usuario.builder()
    // .email(credenciais.getEmail())
    // .senha(credenciais.getSenha()).build();
    // UserDetails usuarioAutenticado = usuarioService.autenticar(usuario);
    // String token = jwtService.gerarToken(usuario);
    // return new TokenDTO(usuario.getEmail(), "Bearer", token);
    // } catch (UsernameNotFoundException | SenhaInvalidaException e ){
    // throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());
    // }
    // }

    // @PostMapping("{id}/permissoes")
    // @ResponseStatus(HttpStatus.NO_CONTENT)
    // public UsuarioDTO atribuirPermissao(@PathVariable Integer id, @RequestBody
    // UsuarioPermissaoForm form) {
    // Permissao permissao =
    // permissaoService.getPermissaoByNome(form.getNomePermissao());
    // Usuario usuario = usuarioService.atribuirPermissao(id, permissao);
    // return new UsuarioDTO(usuario);

    // }
    // @PostMapping("{email}/email/permissao")
    // @ResponseStatus(HttpStatus.NO_CONTENT)
    // public UsuarioDTO atribuirPermissaoporEmail(@PathVariable String email) {
    // Permissao permissao =
    // permissaoService.getPermissaoByNome("ROLE_CLIENTEFREE");
    // Usuario usuario = usuarioService.atribuirPermissaoPorEmail(email, permissao);
    // return new UsuarioDTO(usuario);

    // }

    // @DeleteMapping("{id}")
    // public void deletar(@PathVariable("id") String id) {
    // usuarioService.removeUsuario(usuarioService.getUsuarioById(Integer.parseInt(id)));
    // }
}

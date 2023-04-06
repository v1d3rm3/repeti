package com.projetounidade2.projetorestapisecurity.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;

import com.projetounidade2.projetorestapisecurity.security.JwtAuthFilter;
import com.projetounidade2.projetorestapisecurity.security.JwtService;
import com.projetounidade2.projetorestapisecurity.service.impl.UsuarioServiceImpl;

@EnableWebSecurity
@Configuration
public class SecurityConfig {
    
    @Autowired
    private JwtService jwtService;

    @Autowired
    private UsuarioServiceImpl usuarioService;

    @Bean
    public OncePerRequestFilter jwtFilter(){
        return new JwtAuthFilter(jwtService, usuarioService);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .httpBasic()
            .and().cors()
            .and().csrf().disable()
            .authorizeHttpRequests((authz) -> {
                try {
                    authz
                        .antMatchers("/api/alternativas/**")
                            .hasAnyRole("ADMIN","CLIENTEFREE", "CLIENTEPRO")

                        .antMatchers(HttpMethod.GET, "/api/categorias/**")
                            .permitAll()

                        .antMatchers("/api/categorias/**")
                            .hasRole("ADMIN")

                        .antMatchers(HttpMethod.GET, "/api/listaDeEstudos/**")
                            .permitAll()

                        .antMatchers(HttpMethod.PATCH, "/api/listaDeEstudos/**")
                            .permitAll()

                        .antMatchers("/api/listaDeEstudos/**")
                            .hasAnyRole("ADMIN","CLIENTEPRO")

                        .antMatchers("/api/permissoes/**")
                            .permitAll()
                            // .hasRole("ADMIN")

                        .antMatchers("/api/provas/**")
                            .hasAnyRole("ADMIN","CLIENTEPRO")

                        .antMatchers("/api/questoes/**")
                            .hasAnyRole("ADMIN","CLIENTEPRO", "CLIENTEFREE")

                        .antMatchers(HttpMethod.POST, "/api/usuarios/**")
                            .permitAll()

                        .antMatchers("/api/usuarios/**")
                            .permitAll()
                            // .hasRole("ADMIN")
                        
                        .anyRequest().authenticated()   
                        .and() 
                            .sessionManagement()
                            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                        .and()
                            .addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class);

                } catch (Exception e) {
                    e.printStackTrace();
                }
            });

        return http.build();
    }
}

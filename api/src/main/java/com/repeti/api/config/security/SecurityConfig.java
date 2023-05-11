package com.repeti.api.config.security;

import com.repeti.api.security.JwtAuthFilter;
import com.repeti.api.security.JwtService;
import com.repeti.api.service.impl.UsuarioServiceImpl;
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
                        .antMatchers("/v3/api-docs/**", "/swagger-ui.html", "/swagger-ui/**").permitAll()
                        .antMatchers(HttpMethod.POST, "/api/usuarios/auth").permitAll()
                        .antMatchers(HttpMethod.POST, "/api/usuarios").permitAll()
                        .antMatchers("/api/**").hasRole("USER")
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

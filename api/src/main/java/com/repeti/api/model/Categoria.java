package com.repeti.api.model;

import java.util.List;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "categoria")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String categoria;

    @JsonIgnore
    @OneToMany(mappedBy = "pai", fetch = FetchType.LAZY)
    private List<Categoria> subCategorias;

    @OneToOne()
    private Categoria pai;

    public Categoria(String categoria) {
        this.categoria = categoria;
    }

}

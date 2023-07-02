package com.repeti.api.dao;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.repeti.api.model.Estudo;

@Component
public class EstudoModificacaoSQLImpl implements EstudoModificacaoSQL {

    // @Autowired
    // EntityManager em;

    @Autowired
    private EntityManager em;

    @Override

    // TODO: NOT WORKINGGGG
    @Transactional
    public Estudo inserir(InserirEstudoBancoObjeto objeto) {

        // TESTAR COLOCAR TUDO DENTRO DE UMA ÚNICA QUERY

        Estudo res = null;

        // EntityTransaction tx = em.getTransaction();
        try {
            // tx.begin();
            em.getTransaction().begin();
            var q1 = em.createNativeQuery("insert into estudo (nivel, categoria_id, usuario_id) "
                    + " values (:nivel, :categoria_id, :usuario_id)");
            q1.setParameter("nivel", objeto.getNivel());
            q1.setParameter("categoria_id", objeto.getCategoriaId());
            q1.setParameter("usuario_id", objeto.getUsuarioId());
            q1.executeUpdate();

            var q2 = em.createNativeQuery("select LAST_INSERT_ID() lastId");
            var lastId = q2.getSingleResult();

            // throw new EntidadeNaoEncontradaException("asd");

            var q3 = em.createNativeQuery("select * from estudo where id = :id xzc", Estudo.class);
            q3.setParameter("id", lastId);

            res = (Estudo) q3.getSingleResult();
            em.getTransaction().commit();

            // tx.commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
        }

        return res;
    }

}

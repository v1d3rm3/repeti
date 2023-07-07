CREATE PROCEDURE usuario_recuperarPorEmail(IN email VARCHAR(255))
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        RESIGNAL;
    END;

    DECLARE EXIT HANDLER FOR SQLWARNING
    BEGIN
        RESIGNAL;
    END;

    select 
      u.id 'id',
      u.nome 'nome',
      u.sobrenome 'sobrenome',
      u.email 'email',
      u.senha '_senha'
    from usuario u
    where u.email = email
    COLLATE utf8mb4_0900_ai_ci;
END; 

CREATE PROCEDURE usuario_cadastrar(
  IN email VARCHAR(255), 
  IN nome VARCHAR(255),
  IN sobrenome VARCHAR(255),
  IN senha VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    DECLARE EXIT HANDLER FOR SQLWARNING
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
      insert into usuario (nome, sobrenome, email, senha)
        values (
          nome,
          sobrenome,
          email,
          senha
      );
      select
        u.id 'id',
        u.nome 'nome',
        u.sobrenome 'sobrenome',
        u.email 'email'
      from usuario u
      where u.id = last_insert_id()
      COLLATE utf8mb4_0900_ai_ci;
    COMMIT;
END; 

-- ###########################
-- CATEGORIA
-- ###########################

CREATE PROCEDURE categoria_recuperarPorNome(IN nome VARCHAR(255))
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        RESIGNAL;
    END;

    DECLARE EXIT HANDLER FOR SQLWARNING
    BEGIN
        RESIGNAL;
    END;

    select 
      c1.id 'id',  
      c1.nome 'nome', 
      c2.id 'pai.id',
      c2.nome 'pai.nome'
    from categoria c1
    left join categoria c2
    on c2.categoria_pai_id = c1.id
    where isnull(nome) or c1.nome like concat('%', concat(nome, '%'))
    COLLATE utf8mb4_0900_ai_ci;
END; 

CREATE PROCEDURE categoria_recuperarTodas()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        RESIGNAL;
    END;

    DECLARE EXIT HANDLER FOR SQLWARNING
    BEGIN
        RESIGNAL;
    END;

    select 
      c1.id 'id',  
      c1.nome 'nome', 
      c1.categoria_pai_id 'categoriaPaiId',
      c2.id 'categoriaPai.id',
      c2.nome 'categoriaPai.nome'
    from categoria c1
    left join categoria c2
    on c2.categoria_pai_id = c1.id
    COLLATE utf8mb4_0900_ai_ci;
END;

CREATE PROCEDURE CategoriaVersaoCache_recuperar()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        RESIGNAL;
    END;

    DECLARE EXIT HANDLER FOR SQLWARNING
    BEGIN
        RESIGNAL;
    END;

    select v.versao 'versao'
    from categoria_versao_cache v;
END; 

CREATE TRIGGER Categoria_atualizaVersaoCacheEmInsercao AFTER INSERT ON categoria
FOR EACH ROW
BEGIN
  UPDATE categoria_versao_cache
  SET versao = versao + 1;
END;

CREATE TRIGGER Categoria_atualizaVersaoCacheEmAtualizacao AFTER UPDATE ON categoria
FOR EACH ROW
BEGIN
  UPDATE categoria_versao_cache
  SET versao = versao + 1;
END;

-- ###########################
-- ESTUDO
-- ###########################

CREATE PROCEDURE estudo_cadastrar(
  IN estudanteId INT, 
  IN categoriaId INT,
  IN nivelAtual VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    DECLARE EXIT HANDLER FOR SQLWARNING
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

      insert into estudo (estudante_id, categoria_id, nivel_atual)
        values (
          estudanteId,
          categoriaId,
          nivelAtual
      );
      select
        e.id 'id',
        e.categoria_id 'categoriaId',
        e.estudante_id 'estudanteId',
        e.nivel_atual 'nivelAtual',
        u.id 'estudante.id',
        u.nome 'estudante.nome',
        u.sobrenome 'estudante.sobrenome',
        u.email 'estudante.email',
        c.id 'categoria.id',
        c.nome 'categoria.nome'
      from estudo e
      left join usuario u 
      on u.id = e.estudante_id
      left join categoria c 
      on c.id = e.categoria_id
      where e.id = last_insert_id()
      COLLATE utf8mb4_0900_ai_ci;      
    COMMIT;
END; 

CREATE PROCEDURE estudo_recuperar(IN estudanteId INT)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        RESIGNAL;
    END;

    DECLARE EXIT HANDLER FOR SQLWARNING
    BEGIN
        RESIGNAL;
    END;

    select
      e.id 'id',
      e.categoria_id 'categoriaId',
      e.estudante_id 'estudanteId',
      e.nivel_atual 'nivelAtual',
      u.id 'estudante.id',
      u.nome 'estudante.nome',
      u.sobrenome 'estudante.sobrenome',
      u.email 'estudante.email',
      c.id 'categoria.id',
      c.nome 'categoria.nome'
    from estudo e
    left join usuario u 
    on u.id = e.estudante_id
    left join categoria c 
    on c.id = e.categoria_id
    where 
      (e.estudante_id = estudanteId 
      and e.desativado is null)
    collate utf8mb4_0900_ai_ci;
END; 

CREATE PROCEDURE estudo_recuperarAtivaPorCategoriaId(IN estudanteId INT, IN categoriaId INT)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        RESIGNAL;
    END;

    DECLARE EXIT HANDLER FOR SQLWARNING
    BEGIN
        RESIGNAL;
    END;

    select
      e.id 'id',
      e.categoria_id 'categoriaId',
      e.estudante_id 'estudanteId',
      e.nivel_atual 'nivelAtual',
      u.id 'estudante.id',
      u.nome 'estudante.nome',
      u.sobrenome 'estudante.sobrenome',
      u.email 'estudante.email',
      c.id 'categoria.id',
      c.nome 'categoria.nome'
    from estudo e
    left join usuario u 
    on u.id = e.estudante_id
    left join categoria c 
    on c.id = e.categoria_id
    where (
      e.estudante_id = estudanteId 
      and e.categoria_id = categoriaId
      and e.desativado is null
    )
    collate utf8mb4_0900_ai_ci;
END; 


CREATE PROCEDURE estudo_recuperarPorId(IN estudoId INT)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        RESIGNAL;
    END;

    DECLARE EXIT HANDLER FOR SQLWARNING
    BEGIN
        RESIGNAL;
    END;

    select
      e.id 'id',
      e.categoria_id 'categoriaId',
      e.estudante_id 'estudanteId',
      e.nivel_atual 'nivelAtual',
      u.id 'estudante.id',
      u.nome 'estudante.nome',
      u.sobrenome 'estudante.sobrenome',
      u.email 'estudante.email',
      c.id 'categoria.id',
      c.nome 'categoria.nome'
    from estudo e
    left join usuario u 
    on u.id = e.estudante_id
    left join categoria c 
    on c.id = e.categoria_id
    where (
      e.id = estudoId
    )
    collate utf8mb4_0900_ai_ci;
END; 

-- ###########################
-- QUESTAO
-- ###########################

-- RECUPERA SOMENTE O ID (DIMINUIR CARGA)
-- CREATE PROCEDURE Questao_recuperarSomenteIdPorCategoria(IN categoriaId INT)
-- BEGIN
--     DECLARE EXIT HANDLER FOR SQLEXCEPTION
--     BEGIN
--         RESIGNAL;
--     END;

--     DECLARE EXIT HANDLER FOR SQLWARNING
--     BEGIN
--         RESIGNAL;
--     END;

--     select q.id 'id'
--     from questao q
--     where q.categoria_id = categoriaId
--     collate utf8mb4_0900_ai_ci;
-- END; 

CREATE PROCEDURE Questao_recuperarSomenteIdPorCategoria(IN listaIds VARCHAR(255))
BEGIN
  DECLARE query VARCHAR(1000);
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
      RESIGNAL;
  END;

  DECLARE EXIT HANDLER FOR SQLWARNING
  BEGIN
      RESIGNAL;
  END;

  SET @query = CONCAT('SELECT q.id as id from questao q WHERE q.categoria_id IN (', listaIds, ');');

  -- Executa a query
  PREPARE stmt FROM @query;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;
END; 

CREATE PROCEDURE Questao_recuperarPorIds(IN listaIds VARCHAR(255))
BEGIN
  DECLARE query VARCHAR(1000);

  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
      RESIGNAL;
  END;

  DECLARE EXIT HANDLER FOR SQLWARNING
  BEGIN
      RESIGNAL;
  END;
  
  -- Monta a query dinamicamente
  SET @query = CONCAT('SELECT q.id as id, q.nivel as nivel, q.qualidade as qualidade, q.elaborador_id as elaboradorId, q.categoria_id as categoriaId from questao q WHERE q.id IN (', listaIds, ');');
  
  -- Executa a query
  PREPARE stmt FROM @query;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;

END; 

CREATE PROCEDURE Questao_recuperarAlternativasPorQuestaoId(IN questaoId INT)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        RESIGNAL;
    END;

    DECLARE EXIT HANDLER FOR SQLWARNING
    BEGIN
        RESIGNAL;
    END;

    select 
      a.id 'id',
      a.descricao 'descricao',
      a.resposta 'resposta',
      a.questao_id 'questaoId'
    from alternativa a
    where a.questao_id = questaoId
    collate utf8mb4_0900_ai_ci;
END; 

-- ###########################
-- QUESTOES ESTUDADAS
-- ###########################

CREATE PROCEDURE QuestaoEstudada_recuperarSomenteIdPorEstudo(IN estudoId INT)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        RESIGNAL;
    END;

    DECLARE EXIT HANDLER FOR SQLWARNING
    BEGIN
        RESIGNAL;
    END;

    select qe.id 'id'
    from questao_estudada qe
    where qe.estudo_id = estudoId
    collate utf8mb4_0900_ai_ci;
END; 

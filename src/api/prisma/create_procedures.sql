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

CREATE PROCEDURE Estudo_atualizarNivelAtual(IN estudoId INT, IN nivelAtual VARCHAR(100))
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
      RESIGNAL;
  END;

  DECLARE EXIT HANDLER FOR SQLWARNING
  BEGIN
      RESIGNAL;
  END;

  update estudo 
  set nivel_atual = nivelAtual
  where id = estudoId;
END; 

CREATE PROCEDURE Estudo_criarQuestaoEstudadaEmEstudo(
  IN estudanteId INT, 
  IN estudoId INT, 
  IN alternativaId INT, 
  IN acertou TINYINT
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

    insert into questao_estudada (estudante_id, estudo_id, alternativa_id, acertou)
    values (
      estudanteId,
      estudoId,
      alternativaId,
      acertou
    );

    select 
      qe.id as id,
      qe.estudante_id as estudanteId,
      qe.estudo_id as estudoId,
      qe.alternativa_id as alternativaId,
      qe.acertou as acertou
    from questao_estudada qe
    where qe.id = last_insert_id()
    collate utf8mb4_0900_ai_ci;

  COMMIT;
END; 

CREATE PROCEDURE Estudo_recuperarQuestaoEstudadaPorQuestaoId(
  IN estudoId INT, 
  IN questaoId INT
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

  select 
    qe.id as id,
    qe.estudante_id as estudanteId,
    qe.estudo_id as estudoId,
    qe.alternativa_id as alternativaId,
    qe.acertou as acertou
  from questao_estudada qe
  left join alternativa a 
  on a.id = qe.alternativa_id
  left join questao q
  on q.id = a.questao_id
  where qe.estudo_id = estudoId
  and q.id = questaoId
  collate utf8mb4_0900_ai_ci;
END; 

CREATE PROCEDURE Estudo_desativar(IN estudoId INT)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
      RESIGNAL;
  END;

  DECLARE EXIT HANDLER FOR SQLWARNING
  BEGIN
      RESIGNAL;
  END;

  update estudo 
  SET desativado = now()
  where id = estudoId;
END;

-- ###########################
-- QUESTAO
-- ###########################

CREATE PROCEDURE Questao_recuperarSomenteIdPorCategoria(IN listaIds TEXT)
BEGIN
  DECLARE query TEXT;
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

-- Recupera questões por categoria e nível atual
CREATE PROCEDURE Questao_recuperarSomenteIdPorCategoriaENivel(IN listaIds TEXT, IN nivel VARCHAR(100))
BEGIN
  DECLARE query TEXT;
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
      RESIGNAL;
  END;

  DECLARE EXIT HANDLER FOR SQLWARNING
  BEGIN
      RESIGNAL;
  END;

  SET @query = CONCAT('SELECT q.id as id from questao q WHERE q.categoria_id IN (', listaIds, ') AND nivel = \'', nivel,'\';');

  -- Executa a query
  PREPARE stmt FROM @query;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;
END; 

CREATE PROCEDURE Questao_recuperarPorIds(IN listaIds TEXT)
BEGIN
  DECLARE query TEXT;

  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
      RESIGNAL;
  END;

  DECLARE EXIT HANDLER FOR SQLWARNING
  BEGIN
      RESIGNAL;
  END;
  
  -- Monta a query dinamicamente
  SET @query = CONCAT('SELECT q.id as id, q.enunciado as enunciado, q.nivel as nivel, q.qualidade as qualidade, q.elaborador_id as elaboradorId, q.categoria_id as categoriaId from questao q WHERE q.id IN (', listaIds, ');');
  
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

CREATE PROCEDURE Questao_recuperarPorId(IN questaoId INT)
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
    q.id as id,
    q.enunciado as enunciado,
    q.nivel as nivel,
    q.qualidade as qualidade,
    q.elaborador_id as elaboradorId,
    q.categoria_id as categoriaId
  from questao q 
  where q.id = questaoId
  collate utf8mb4_0900_ai_ci;
END; 

-- ###########################
-- QUESTAO ESTUDADA
-- ###########################

CREATE PROCEDURE QuestaoEstudada_recuperarQuestoesPorEstudoSomenteId(IN estudoId INT)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        RESIGNAL;
    END;

    DECLARE EXIT HANDLER FOR SQLWARNING
    BEGIN
        RESIGNAL;
    END;

    select q.id 'id'
    from questao_estudada qe
    left join alternativa a
    on a.id = qe.alternativa_id
    left join questao q
    on q.id = a.questao_id
    where qe.estudo_id = estudoId
    collate utf8mb4_0900_ai_ci;
END; 

CREATE PROCEDURE QuestaoEstudada_recuperarPorId(IN questaoEstudadaId INT)
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
    qe.id as id,
    qe.acertou as acertou,
    qe.nivel as nivel,
    qe.qualidade as qualidade,
    qe.estudante_id as estudanteId,
    qe.estudo_id as estudoId,
    qe.alternativa_id as alternativaId,
    a.id as 'alternativa.id',
    a.descricao as 'alternativa.descricao',
    a.resposta as 'alternativa.resposta',
    a.questao_id as 'alternativa.questaoId',
    q.id as 'questao.id',
    q.enunciado as 'questao.enunciado',
    q.nivel as 'questao.nivel',
    q.qualidade as 'questao.qualidade',
    q.elaborador_id as 'questao.elaboradorId',
    q.categoria_id as 'questao.categoriaId',
    u.id as 'estudante.id',
    u.nome as 'estudante.nome',
    u.sobrenome as 'estudante.sobrenome',
    u.email as 'estudante.email'
  from questao_estudada qe
  left join alternativa a
  on a.id = qe.alternativa_id
  left join questao q
  on q.id = a.questao_id
  left join usuario u
  on u.id = qe.estudante_id
  where qe.id = questaoEstudadaId
  collate utf8mb4_0900_ai_ci;
END; 

CREATE PROCEDURE QuestaoEstudada_atualizarNivelEQualidade(IN questaoEstudadaId INT, IN nivel VARCHAR(100), IN qualidade VARCHAR(100))
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
      RESIGNAL;
  END;

  DECLARE EXIT HANDLER FOR SQLWARNING
  BEGIN
      RESIGNAL;
  END;

  update questao_estudada 
  SET nivel = nivel, qualidade = qualidade
  where id = questaoEstudadaId;
END;
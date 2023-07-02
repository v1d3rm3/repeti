TRUNCATE TABLE categoria;

INSERT INTO categoria (categoria)
VALUES ('Portugues');

INSERT INTO categoria (categoria)
VALUES ('Matematica');

SET @matematica_id = LAST_INSERT_ID();

INSERT INTO categoria (categoria, pai_id)
VALUES ('Aritimetica', @matematica_id);

INSERT INTO categoria (categoria, pai_id)
VALUES ('Calculo', @matematica_id);

INSERT INTO categoria (categoria, pai_id)
VALUES ('Combinatoria', @matematica_id);
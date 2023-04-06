# DIM0547-DevWebII-ProjetoII

Projeto da segunda e terceira unidades da disciplina de Desenvolvimento de Sistemas Web II da UFRN.

# Inicializando o banco de dados através do Docker
Para iniciar o ambiente com o Banco de Dados, primeiro é necessário instalar o Docker:
- https://docs.docker.com/engine/install/ubuntu/

Depois de instalado, é necessários realizar configurações pós-instalação:
- https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user

Somente o tópico que consiste de "Manage Docker as a non root user".

Após instalado e configurado o Docker, gere os builds da api-spring-boot e do front-end angular com os seguintes comandos e nas respectivas pastas.

## Gerando build da API

```console
$ cd projeto-rest-api-security
$  ./mvnw clean install -DskipTests=true
```

## Gerando build do front-end Angular

```console
$ cd crud-angular
$ ng build --configuration=production
```

## Executando a aplicação

Na raiz do projeto, execute

```console
$ docker-compose build
$ docker-compose up
```

A aplicação angular web está configurada para rodar no http://localhost:4000, a api-produção no http://localhost:8080 e a api-desenvolvimento está no http://localhost:8080.

# Modelo ER

> 'Prova' possui varias 'Questao' 

> 'Questao' possui varias 'Alternativas'
> 'Questao' possui uma'Categoria'  

> 'Alternativa' possui varias 'Questao'  

> 'Usuario' possui um ou varias 'ListaDeEstudos'  

> 'ListaDeEstudos' possui varias 'Questoes'


# Funcionalidades

> Usuário pode criar 'Prova' e adicionar 'Questao'.

> Usuário pode criar 'Questao' e criar 'Alternativa' para a questão.

> Usuário pode criar 'ListaDeEstudos' e adicionar 'Questao' a Lista.
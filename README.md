## Utilizando o projeto

**Instale o Docker na sua máquina!**

```
docker compose up -d
npm install -g @microsoft/rush
rush update # instala as dependencias
```
### Para iniciar o banco de dados

```
cd src/api
rushx db:reset
```

Você pode realizar, também, o preenchimento de dados
padronizados no banco:

```
cd src/api
rushx db:lightly-seed # ou db:heavily-seed
```

### Para iniciar a API
```
cd src/api
rushx start:dev
```

### Para iniciar a APP
```
cd src/app
rushx dev
```
## Utilizando o projeto

**Instale o Docker na sua máquina!**

```
docker compose up -d
npm install -g @microsoft/rush
rush update # instala as dependencias
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
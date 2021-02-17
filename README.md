# API Encurtador de URL

# Funcionalidades!

-   /encurtador
-   /{newUrl}

### Criação de ambiente e deploy

```sh
$ mkdir encurtador_url
$ cd encurtador_url
$ git clone https://github.com/Breno-N/shortenerURL.git
$ docker-compose build
$ docker-compse up -d
```

### Execução de testes

```sh
$ cd encurtador_url
$ docker exec -it app_node npm run test
```

### Documentação

Documentação feita com Swagger, disponível em http://localhost:8081/api-docs

### Rebuild e deploy
```sh
$ mkdir encurtador_url
$ cd encurtador_url
$ docker-compose down
$ docker-compose build
$ docker-compse up -d
```

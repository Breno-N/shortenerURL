# API Encurtador de URL

# Funcionalidades!

-   /encurtador
-   /{newUrl}

### Criação de ambiente e deploy

```sh
$ mkdir projeto
$ cd projeto
$ git clone https://github.com/Breno-N/shortenerURL.git
$ cd shortenerURL
$ docker-compose build
$ docker-compose up -d
```

### Execução de testes

```sh
$ docker exec -it app_node npm run test
```

### Documentação

Documentação feita com Swagger, disponível em http://localhost:8081/api-docs

### Rebuild e deploy
```sh
$ docker-compose down
$ docker-compose build
$ docker-compse up -d
```

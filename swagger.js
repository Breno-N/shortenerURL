require('dotenv').config({
    path:
        process.env.NODE_ENV === 'test' 
        ? '.env.test' 
        : '.env'
});
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Encurtador de URL API",
        description: "Encurta URLs cadastradas e redireciona quando endpoint correspondente é chamado",
        contact: {
            email: "bhmn91@gmail.com"
        },
        version: "1.0.0"
    },
    host: `localhost:${process.env.APP_PORT}`,
    basepath: "/",
    tags: [
        {name: "Encurtador"},
        {name: "Redirecionar"}
    ],
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"]
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/app/routes/encurtador.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./src/app.js');
});
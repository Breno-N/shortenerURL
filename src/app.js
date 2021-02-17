require('dotenv').config({
    path:
        process.env.NODE_ENV === 'test' 
        ? '.env.test' 
        : '.env'
});

const express = require('express');
const encurtador =  require('./app/routes/encurtador');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');

class AppController {

    constructor(){
        this.express = express();
        this.express.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(swaggerFile)
        );
        this.middlewares();
        this.routes();
    };

    middlewares(){
        this.express.use(express.urlencoded({ extended:true }));
        this.express.use(express.json());
    };

    routes(){
        this.express.use(encurtador);
    };
};

module.exports = new AppController().express;
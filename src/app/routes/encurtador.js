const express = require('express');
const router = express.Router();
const getConnection = require('../middlewares/getConnection');
const controller = require('../controllers/EncurtadorController');

router.get('/:newUrl', getConnection, (...args) => 

    /*
        #swagger.method = 'get'
        #swagger.tags = ['Redirecionar']
        #swagger.summary = 'Redireciona url encurtada'
        #swagger.operationId = 'redirectURL' 
        #swagger.parameters['newUrl'] = {
            in: 'path',
            type: 'string',
            required: true
        }
        #swagger.responses[404] = {
            description: 'Não encontrado'
        }
        #swagger.responses[500] = {
            description: 'Erro interno'
        }
    */
    controller.redirectURL(...args)
);
router.post('/encurtador', getConnection, (...args) => 
    
    /*  
        #swagger.method = 'post'
        #swagger.tags = ['Encurtador']
        #swagger.summary = 'Cadastra url encurtada'
        #swagger.operationId = 'encurtarURL' 
        #swagger.parameters['obj'] = {
            in: 'body',
            type: 'string',
            schema: {
                url: 'https://www.google.com.br/'
            }
        }
        #swagger.responses[201] = {
            description: 'Cadastro efetuado com sucesso'
        }
        #swagger.responses[500] = {
            description: 'Erro interno'
        }
    */
    controller.encurtarURL(...args)
);

module.exports = router;
const { customAlphabet } = require('nanoid');
const EncurtadorDAO = require('../dao/EncurtadorDAO');
let nanoid = customAlphabet('1234567890abcdef', 8);
const { isExpiredTime } = require('../utils/validation');

class EncurtadorController {

    constructor(){
        this._dao  = new EncurtadorDAO();
    };

    async redirectURL(req, res){
        const {conn} = req;
        try{
            let { newUrl } = req.params || null;
            let newUrlComplete = `${process.env.APP_BASE_URL}:${process.env.APP_PORT}/${newUrl}`;
            let result = await this._dao.findByNewUrl(conn, {newUrl: newUrlComplete});
            if(!result.length) {
                return res.status(404).json({message: 'Nenhum resultado encontrado para url informada.'});
            } else {
                const {url, createdat} = result[0];
                isExpiredTime(createdat);
                return res.redirect(url);
            }
        } catch (error) {
            const { message } = error;
            return res.status(500).json({message : `Erro interno - não foi possivel redirecionar por url encurtada. ${message}`});
        }
    };

    async encurtarURL(req, res){
        const { conn } = req;
        try{
            const { url } = req.body || null;
            let newUrl = `${process.env.APP_BASE_URL}:${process.env.APP_PORT}/${nanoid()}`;
            let result = await this._dao.save(conn, { url, newUrl });
            const saved = result.newurl;
            return res.status(201).json({newUrl: saved});
        } catch (error) {
            const { message } = error;
            return res.status(500).json({message});
        }
    };
};
module.exports = new EncurtadorController();
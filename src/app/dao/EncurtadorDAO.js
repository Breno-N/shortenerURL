const util = require('util');
const { parseWhere, closeConnection } = require('../utils/sql');
const { isRequired } = require('../utils/validation');

class EncurtadorDAO {

    async findByNewUrl(conn, filter){
        if(!conn){
            throw Error('A conexão é obrigatória');
        }
        try {
            const {newUrl} = filter;
            isRequired(filter, ['newUrl']);
            let query = {
                text: 'SELECT url, createdAt FROM public.encurtador WHERE newUrl = $1',
                values: [newUrl],
            };
            const {rows} = await conn.query(query);
            return rows || [];
        } catch(error) {
            throw Error(error);
        } finally {
            await closeConnection(conn);
        }
    };

    async save(conn, data){
        if(!conn){
            throw Error('A conexão é obrigatória.');
        }
        try {
            const {url, newUrl} = data;
            isRequired(data, ['url', 'newUrl']);
            const query = {
                text: 'INSERT INTO public.encurtador(url, newUrl, createdAt) VALUES($1, $2, $3) RETURNING newUrl',
                values: [url, newUrl, new Date()]
            };
            const {rows} = await conn.query(query);
            return rows[0];
        } catch(error) {
            throw Error(error);
        } finally {
            await closeConnection(conn);
        }
    };
};
module.exports = EncurtadorDAO;
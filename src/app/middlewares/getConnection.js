const PostgresManager = require('../../database/PostgresManager');

module.exports = async (req, res, next) => {
    try {
        req.conn = await PostgresManager.pgPool.connect();
        console.log(`request - get connection`);
        res.on('close', async () => {
            try{
                if(req.conn){
                    await req.conn.release();
                }
                console.log(`request - connection released on close`);
            } catch(error) {
                console.log(`request - connection already released - ${error.message} on close`);
            }
        });
        return next();
    } catch(error) {
        const message = `Cannot get connection, error: ${error.message}`;
        res.status(500).json({message});
    }
};
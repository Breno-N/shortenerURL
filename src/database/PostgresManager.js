const { Pool } = require('pg');
const dbconfig = require('./dbConfig');

class PostgresManager {
    
    constructor(){
        if(PostgresManager.instance instanceof PostgresManager){
            return PostgresManager.instance;
        }
        this.pgPool = null;
        this.createPool = async () => {
            this.pgPool = await new Pool({
                user: dbconfig.user,
                host: dbconfig.host,
                database: dbconfig.database,
                password: dbconfig.password,
                port: dbconfig.port,
            });
            console.log(`PostgresManager: pool created successfully for user: ${dbconfig.user}`);
            return;
        };
        this.closePool = async () => {
            try {
                await this.pgPool.end();
            } catch (error) {
                console.log(err.message);
            }
        };
        this.closePoolAndExit = async () => {
            console.log(`\nPostgresManager: closing pool...`);
            try {
                if(this.pgPool){            
                    await this.pgPool.end();
                    console.log(`PostgresManager: pool closed successfully...`);
                }
                process.exit(0);
            } catch(error) {
                console.log(error.message);
                process.exit(1);
            }
        };
        this.closeConnection = async (conn) => {
            try {
                if(conn){
                    await conn.release();
                }
                console.log(`Connection released`);
            } catch(error) {
                console.log(`Connection cannot be closed ${error.message}`);
            }
        };

        PostgresManager.instance = this;
    }
}

module.exports = new PostgresManager();
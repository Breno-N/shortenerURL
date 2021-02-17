require('dotenv').config({
    path:
        process.env.NODE_ENV === 'test' 
        ? '.env.test' 
        : '.env'
});

module.exports = {
    host: process.env.DB_HOST || 'app_db',
    database: process.env.DB_DATABASE || 'app_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    port: process.env.DB_PORT || '5432'
};
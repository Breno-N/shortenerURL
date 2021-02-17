const app = require('./app');
const PostgresManager = require('../src/database/PostgresManager');
const PORT = process.env.APP_PORT || 8081;

app.listen(PORT).on('listening', async () => {
    console.log(`Server running at ${PORT}`);
    try {
        await PostgresManager.createPool();
    } catch(error) {
        console.log(error);
        PostgresManager.closePoolAndExit();
    }
});

process
    .once('SIGTERM', PostgresManager.closePoolAndExit)
    .once('SIGINT', PostgresManager.closePoolAndExit);
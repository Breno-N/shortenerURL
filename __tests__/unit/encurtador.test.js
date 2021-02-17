const PostgresManager = require('../../src/database/PostgresManager');
const EncurtadorDAO = require('../../src/app/dao/EncurtadorDAO');

describe('EncurtadorDAO', () => {

    beforeAll(async (done) => {
        try{
            await PostgresManager.createPool();
        } catch (error) {
            console.log(error);
        } finally {
            done();
        }
    });

    afterAll(async (done) => {
        try{
            await PostgresManager.closePool();
        } catch (error) {
            console.log(error);
        } finally {
            done();
        }
    });

    it('Save: should save Encurtador with valid data', async () => {
        let dao = new EncurtadorDAO();
        const conn = await PostgresManager.pgPool.connect();

        let testEncurtador = {
            url: 'https://www.google.com',
            newUrl: 'http://localhost:8081/abc1234c'
        };

        let response = await dao.save(conn, testEncurtador);
        expect(response.newurl).toEqual(testEncurtador.newUrl);
    });

    it('Save: should not save Encurtador missing connection', async () => {
        let dao = new EncurtadorDAO();
        const conn = await PostgresManager.pgPool.connect();

        let testEncurtador = {
            url: 'https://www.google.com',
            newUrl: 'http://localhost:8081/abc1234c' 
        };

        await expect(dao.save(null, testEncurtador)).rejects.toThrow();
    });

    it('Save: should not save Encurtador missing url', async () => {
        let dao = new EncurtadorDAO();
        const conn = await PostgresManager.pgPool.connect();

        let testEncurtador = {
            newUrl: 'http://localhost:8081/abc1234c' 
        };

        await expect(dao.save(conn, testEncurtador)).rejects.toThrow();
    });

    it('Save: should not save Encurtador with empty url', async () => {
        let dao = new EncurtadorDAO();
        const conn = await PostgresManager.pgPool.connect();

        let testEncurtador = {
            url: '',
            newUrl: 'http://localhost:8081/abc1234c' 
        };

        await expect(dao.save(conn, testEncurtador)).rejects.toThrow();
    });

    it('Save: should not save Encurtador missing newUrl', async () => {
        let dao = new EncurtadorDAO();
        const conn = await PostgresManager.pgPool.connect();

        let testEncurtador = {
            url: 'https://www.google.com',
        };

        await expect(dao.save(conn, testEncurtador)).rejects.toThrow();
    });

    it('Save: should not save Encurtador with empty newUrl', async () => {
        let dao = new EncurtadorDAO();
        const conn = await PostgresManager.pgPool.connect();

        let testEncurtador = {
            url: 'https://www.google.com',
            newUrl: ''  
        };

        await expect(dao.save(conn, testEncurtador)).rejects.toThrow();
    });

    it('Find by valid newUrl', async () => {
        let dao = new EncurtadorDAO();
        let conn = await PostgresManager.pgPool.connect();

        let testEncurtador = {
            url: 'https://www.google.com',
            newUrl: 'http://localhost:8081/abc1234c' 
        };

        const saved = await dao.save(conn, testEncurtador);

        conn = await PostgresManager.pgPool.connect();
        const filter = {
            newUrl: saved.newurl
        };
        const response = await dao.findByNewUrl(conn, filter);

        expect(response.length).toBeGreaterThan(0);
        expect(response[0].url).toEqual(testEncurtador.url);
    });

    it('Find by inexistent newUrl', async () => {
        let dao = new EncurtadorDAO();
        let conn = await PostgresManager.pgPool.connect();

        let testEncurtador = {
            url: 'https://www.google.com',
            newUrl: 'http://localhost:8081/abc1234c' 
        };

        const saved = await dao.save(conn, testEncurtador);

        conn = await PostgresManager.pgPool.connect();
        const filter = {
            newUrl: 'testeUrl'
        };
        const response = await dao.findByNewUrl(conn, filter);

        expect(response.length).toBe(0);
        expect(response).toEqual([]);
    });

});

const request = require('supertest');
const app = require('../../src/app');
const PostgresManager = require('../../src/database/PostgresManager');

describe('Encurtador', () => {

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

    it('Save: should save with valid data', async () => {
        let testEncurtador = {
            url: 'https://www.google.com'
        };

        const response = await request(app)
            .post('/encurtador')
            .send(testEncurtador);
        
        testEncurtador.newUrl = response.body.newUrl;

        expect(response.status).toBe(201);
        expect(response.body.newUrl).toEqual(testEncurtador.newUrl);
    });

    it('Save: should not save missing url', async () => {
        const response = await request(app).post('/encurtador').send({});

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('message', 'Error: url é obrigatório');
    });

    it('Save: should not save with invalid url', async () => {
        const response = await request(app).post('/encurtador').send({url: ''});

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('message', 'Error: url é obrigatório');
    });

    it('Find by inexistent newUrl', async () => {
        let testEncurtador = {
            url: 'https://www.google.com'
        };

        const saved = await request(app).post('/encurtador').send(testEncurtador);

        const response = await request(app).get(`/teste123`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('message', 'Nenhum resultado encontrado para url informada.');
    });

});

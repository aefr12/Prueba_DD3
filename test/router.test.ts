import Server from '../models/server';
import request from 'supertest';

let app = new Server();

app.listen();

describe('POST /obtienePalabra', () => {
    test('Obtiene un status true', async () => {
        const response = await request(app).post('/obtienePalabra').send();
        console.log(response);
    });
});
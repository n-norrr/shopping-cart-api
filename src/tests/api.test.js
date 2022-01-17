const User = require('../models/User.js');
const server = require('../index.js');
const mockdb = require('./mockdb');
const request = require('supertest');

beforeAll(async () => {
    await mockdb.start();
})

afterEach(async () => {
    await mockdb.clear();
})

afterAll(async () => {
    server.close();
    await mockdb.close();
})

describe('Authentication Tests', () => {
    it('should create user', async () => {
        const data = {
            email: "kylemcgee23@gmail.com",
            username: "Kyle23",
            password: "password23"
        }
        const response = await request(server).post("/api/register").send(data);

        const user = await User.findOne({ email: 'kylemcgee23@gmail.com' })

        expect(response.status).toBe(201);
        expect(user.email).toEqual("kylemcgee23@gmail.com");
        expect(user.username).toEqual("Kyle23");
        expect(user.password.length).toBeGreaterThan(0);
    })
})
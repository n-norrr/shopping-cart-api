const User = require('../models/User.js');
const mockdb = require('./mockdb');
const request = require('supertest');
const app = require('../index.js');

beforeAll(async () => {
    await mockdb.start();
})

afterEach(async () => {
    await mockdb.clear();
})

afterAll(async () => {
    await mockdb.close();
    app.close();
})

describe('Authentication Tests', () => {
    it('should create user', async () => {
        const data = {
            email: "kylemcgee23@gmail.com",
            username: "Kyle23",
            password: "password23"
        }
        const response = await request(app).post("/api/register").send(data);

        const user = await User.findOne({ email: 'kylemcgee23@gmail.com' })

        expect(response.status).toBe(201);
        expect(user.email).toEqual("kylemcgee23@gmail.com");
        expect(user.username).toEqual("Kyle23");
        expect(user.password.length).toBeGreaterThan(0);
    })
})
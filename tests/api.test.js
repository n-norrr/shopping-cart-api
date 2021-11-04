const { registerUser } = require('../services/user.js');
const User = require('../models/User.js');
const db = require('./db');
const request = require('supertest');
const app = require('../index.js');

beforeAll(async () => {
    await db.connect();
})

afterEach(async () => {
    await db.clear();
})

afterAll(async () => {
    await db.close();
})

describe('insert', () => {
    it('create user', async () => {
        const data = {
            email: "kylemcgee23@gmail.com",
            username: "Kyle23",
            password: "password23"
        }
        await request(app).post('/register').send(data);

        const user = await User.findOne({ email: 'kylemcgee23@gmail.com' });

        expect(user.email).toEqual("kylemcgee23@gmail.com");
        expect(user.username).toEqual("Kyle23");
        expect(user.password).toEqual("password23");
    })
})
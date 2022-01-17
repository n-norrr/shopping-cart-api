const { registerUser } = require('../services/user.js');
const User = require('../models/User.js');
const mockdb = require('./mockdb');
require('dotenv').config();

beforeAll(async () => {
    await mockdb.start();
})

afterEach(async () => {
    await mockdb.clear();
})

afterAll(async () => {
    await mockdb.close();
})

describe('insert', () => {
    it('create user', async () => {
        await registerUser(
            "kylemcgee23@gmail.com",
            "Kyle23",
            "password23"
        );

        const user = await User.findOne({ email: 'kylemcgee23@gmail.com' });

        expect(user.email).toEqual("kylemcgee23@gmail.com");
        expect(user.username).toEqual("Kyle23");
        expect(user.password.length).toBeGreaterThan(0);
    })
})
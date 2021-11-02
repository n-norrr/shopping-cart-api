const { registerUser } = require('../services/user.js');
const db = require('./db');

describe('insert', () => {
    beforeAll(async () => {
        await db.connect();
    })

    afterEach(async () => {
        await db.clear();
    })

    afterAll(async () => {
        await db.close();
    })

    it('create user', async () => {
        const user = await registerUser(
            "kylemcgee23@gmail.com",
            "Kyle23",
            "password23"
        )

        expect(user.email).toEqual("kylemcgee23@gmail.com");
        expect(user.username).toEqual("Kyle23");
        expect(user.password).toEqual("password23");
    })
})
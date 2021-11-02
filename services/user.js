const User = require('../models/User.js');

const registerUser = async (email, username, password) => {
    if (!email || !username || !password) {
        throw new Error('Missing credentials');
    }

    try {
        const newUser = new User({
            email,
            username,
            password
        });

        return await newUser.save();
    } catch (e) {
        throw new Error('Could not create user.');
    }
}

module.exports = { registerUser };
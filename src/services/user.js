const cryptoJS = require('crypto-js')
const User = require('../models/User.js');

const registerUser = async (email, username, rawPassword) => {
    if (!email || !username || !rawPassword) {
        throw { status: 401, message: 'Missing credentials' }
    }

    const password = cryptoJS.AES.encrypt(rawPassword, process.env.CRYPTO_KEY).toString();

    const newUser = new User({
        email,
        username,
        password
    })

    return await newUser.save()
}

const loginUser = async (email, password) => {
    if (!email || !password) {
        throw { status: 401, message: 'Missing credentials' }
    }

    const user = await User.findOne({ email: email });

    if (!user) { 
        throw { status: 401, message: 'Could not find user' }
     }

    const decodedPassword = cryptoJS.AES.decrypt(user.password, process.env.CRYPTO_KEY).toString(cryptoJS.enc.Utf8);

    if (password != decodedPassword) {
        throw { status: 401, message: 'Incorrect password' }
    }

    return user
}

module.exports = { registerUser, loginUser };
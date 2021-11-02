const { registerUser } = require('../services/user.js');

const register = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const savedUser = await registerUser(email, username, password);
        res.status(201).json(savedUser);
    } catch (e) {
        res.status(500).json(e);
    }
}

module.exports = { register };
const { registerUser, loginUser } = require('../services/user.js');

const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const savedUser = await registerUser(email, username, password);
        res.status(201).json(savedUser);
    } catch (e) {
        res.status(500).json(e.message);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const currUser = await loginUser(email, password);
        res.status(200).json(currUser);
    } catch (e) {
        res.status(500).json(e.message);
    }
}

module.exports = { register, login };
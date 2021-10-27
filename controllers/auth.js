import User from '../models/User.js';

export const registerUser = async (req, res) => {
    const user = new User({
        email:      req.body.email,
        username:   req.body.username,
        password:   req.body.password
    });

    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (e) {
        res.status(500).json(e);
    }
}
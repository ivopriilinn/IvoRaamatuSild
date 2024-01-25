//const { User } = require('../models/User.model');
const {db} = require("../../db")
const User = db.users

// Controller to get all user
exports.getAll = async (req, res) => {
    try {
        const user = await User.findAll();
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


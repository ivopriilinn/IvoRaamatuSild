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

// Controller to get a user by ID
exports.getById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to create a new user
exports.createNew = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating new user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to update a user by ID
exports.updateById = async (req, res) => {
    try {
        const [updatedRows] = await User.update(req.body, { where: { id: req.params.id } });
        if (updatedRows === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const updatedUser = await User.findByPk(req.params.id);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

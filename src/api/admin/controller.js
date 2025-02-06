const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    signIn: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).send({ error: 'User not found' });
            }
            console.log('Password from request:', password);
console.log('Stored hashed password:', user.password);  
            const isMatch = await bcrypt.compare(password, user.password);
            console.log(isMatch)
            if (!isMatch) {
                return res.status(400).send({ error: 'Invalid password' });
            }
            const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY, { expiresIn: '10h' });
            return res.send({ user, token });
        } catch (err) {
            return res.status(400).
                send({ error: 'User not found' });

        }
    },
    signUp: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (await User.findOne({ email })) {
                return res.status(400).send({ error: 'User already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 8);
            const newUser = await User.create({ name, email, password: hashedPassword });
            return res.status(201).send(newUser);
        } catch (err) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    },
    userDetails: async (req, res) => {
        try {
            const { id } = req.query;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).send({ error: 'User not found' });
            }
            return res.send(user);
        } catch (err) {
            return res.status(400).send({ error: 'Failed to fetch user details' });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { password, ...updateData } = req.body;
            if (password) {
                updateData.password = await bcrypt.hash(password, 8);
            }
            const user = await User.findByIdAndUpdate(req.query.id, updateData, { new: true });
            return res.send(user);
        } catch (err) {
            return res.status(400).send({ error: 'Update failed' });
        }
    },
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.send();
        } catch (err) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    }
};


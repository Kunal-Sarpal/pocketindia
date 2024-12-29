const express = require('express');
const jwt = require('jsonwebtoken');
const Adminrouter = express.Router();

Adminrouter.get('/', (req, res) => {
    res.send("Healthy");
});

Adminrouter.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_MAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.ADMIN_SECRET, { expiresIn: '8h' });
            return res.status(200).json({ token, msg: "Registered" });
        } else {
            return res.status(401).json({ msg: "Invalid Credentials" });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message | "server error" });
    }
});

module.exports = Adminrouter;

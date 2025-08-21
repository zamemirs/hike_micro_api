// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Dummy user (replace later with DB)
const USER = {
    username: "admin",
    password: "password123"
};

// Login API
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (username === USER.username && password === USER.password) {
        res.json({ success: true, message: "Login successful", token: "abc123xyz" });
    } else {
        res.status(401).json({ success: false, message: "Invalid username or password" });
    }
});

// Test API
app.get('/api', (req, res) => {
    res.json({ message: "Hello from Backend with Login Feature ✅" });
});

// Start Server
app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});

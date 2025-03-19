const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for users
let users = [];

// Routes
app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.json({ message: 'User added', user });
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.json({ message: 'User deleted', userId });
});

// Serve static files (frontend)
app.use(express.static('../frontend'));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
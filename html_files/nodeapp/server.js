// server.js

const express = require('express');
const app = express();
const port = 3000; // You can change this to any port you prefer

// Serve the frontend using express static middleware
app.use(express.static('../'));

// Define a sample endpoint in your backend
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

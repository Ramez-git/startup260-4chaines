const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB connection string)
mongoose.connect('mongodb+srv://cs260:lobe12345@cluster0.hffhtse.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const port = 3000;

// Define a simple mongoose model
const YourModel = mongoose.model('YourModel', {
  key: String,
  value: String
});

// Middleware to parse JSON
app.use(express.json());

// Endpoint to get data
app.get('/getData', async (req, res) => {
  try {
    const data = await YourModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to save data
app.post('/saveData', async (req, res) => {
  try {
    const newData = req.body; // Assuming you're sending JSON data in the request body
    const savedData = await YourModel.create(newData);
    res.json(savedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

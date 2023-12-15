const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const port = 3000;

const YourModel = mongoose.model('YourModel', {
  key: String,
  value: String
});

app.use(express.json());

// Get all data
app.get('/getData', async (req, res) => {
  try {
    const data = await YourModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save data
app.post('/saveData', async (req, res) => {
  try {
    const newData = req.body;
    const savedData = await YourModel.create(newData);
    res.json(savedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete data by ID
// Delete data by ID
app.delete('/deleteData/:id', async (req, res) => {
    try {
      const idToDelete = req.params.id;
      console.log('Received ID for deletion:', idToDelete); // Log the received ID for troubleshooting
      const deletedData = await YourModel.findByIdAndDelete(idToDelete);
      if (!deletedData) {
        return res.status(404).json({ error: 'Data not found' });
      }
      res.json({ message: 'Data deleted successfully', deletedData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

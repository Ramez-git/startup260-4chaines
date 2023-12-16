const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const WebSocket = require('ws');

const app = express();
const port = 3000;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

mongoose.connect('mongodb+srv://cs260:lobe12345@cluster0.hffhtse.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// WebSocket connection to the server
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');
});

const Item = mongoose.model('Item', {
  type: String,
  subject: String,
  comment: String,
});

app.use(express.json());

app.get('/api/data', async (req, res) => {
  try {
    const result = await Item.find({});
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/data', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const result = await newItem.save();
    res.json(result);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify([req.body]));
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// WebSocket handler for real-time updates
app.server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});
app.delete('/api/data/:subject/:comment', async (req, res) => {
  const { subject, comment } = req.params;
  try {
    const result = await Item.deleteOne({ subject, comment });
    if (result.deletedCount > 0) {
      res.json({ message: 'Thread deleted successfully' });
    } else {
      res.status(404).json({ error: 'Thread not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/comments/:subject/:commentText', async (req, res) => {
  const { subject, commentText } = req.params;
  try {
    const thread = await Item.findOne({ subject });
    if (thread) {
      const updatedComments = thread.comments.filter(comment => comment !== commentText);
      thread.comments = updatedComments;
      await thread.save();
      res.json({ message: 'Comment deleted successfully' });
    } else {
      res.status(404).json({ error: 'Thread not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

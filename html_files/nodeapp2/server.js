const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const WebSocket = require('ws');

const app = express();
const port = 4000;

// Enable CORS
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Your MongoDB connection code
mongoose.connect('mongodb+srv://cs260:lobe12345@cluster0.hffhtse.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Item = mongoose.model('Item', new mongoose.Schema({
    username: String,
    type: String,
    password: String,
    comment: String,
  }, { collection: 'Users' })); // Replace 'your_specific_collection_name' with the desired collection name

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', async (ws) => {
  console.log('WebSocket connection established');

  try {
    // Fetch existing users from the database and send them to the new client
    const users = await Item.find({}, 'username');
    const existingUsers = users.map((user) => user.username);
    ws.send(JSON.stringify({ existingUsers }));
  } catch (err) {
    console.error('Error fetching users:', err);
  }
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
    const { username, password } = req.body;

    // Check if the username already exists in the database
    const existingUser = await Item.findOne({ username });

    if (existingUser) {
      // User already exists
      return res.json({ message: `Welcome back, ${username}!` });
    }
    else{
    // User does not exist, create a new user
    const newUser = new Item({ username, password });
    const result = await newUser.save();
    
    // Broadcast the new data to connected WebSocket clients
    const users = await Item.find({}, 'username');
    const existingUsers = users.map((user) => user.username);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ existingUsers }));
      }
    });

    res.json({ message: `Welcome, new user ${username}!` });
  }} catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '../index.html');
});

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

server.on('upgrade', (request, socket, head) => {
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

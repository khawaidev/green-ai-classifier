const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Basic route
const classifyRoute = require('./routes/classify');

app.use('/classify', classifyRoute);

const fs = require('fs');
const path = require('path');

app.use(express.static(path.join(__dirname, '..', 'dashboard')));

app.get('/api/data', (req, res) => {
  const dbPath = path.join(__dirname, 'data', 'green-pages.json');
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading data file:', err);
      return res.status(500).json({ error: 'Failed to read data' });
    }
    res.json(JSON.parse(data));
  });
});

app.get('/', (req, res) => {
  res.send('Green AI Web Page Classifier Backend');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
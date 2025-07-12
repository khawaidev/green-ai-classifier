const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Basic route
const classifyRoute = require('./routes/classify');

app.use('/classify', classifyRoute);

const fs = require('fs');
const path = require('path');

app.use(express.static(path.join(__dirname, '..', 'dashboard')));

app.get('/api/data', (req, res) => {
  const dbPath = path.join(__dirname, 'data', 'green-pages.json');

  // Ensure file exists
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '[]');
  }

  fs.readFile(dbPath, 'utf-8', (err, raw) => {
    if (err) {
      console.error('Error reading data file:', err);
      return res.status(500).json({ error: 'Failed to read data' });
    }

    try {
      const parsed = raw.trim() === '' ? [] : JSON.parse(raw);
      res.json(parsed);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      res.status(500).json({ error: 'Invalid JSON data' });
    }
  });
});


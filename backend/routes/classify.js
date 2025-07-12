const express = require('express');
const router = express.Router();
const moderationService = require('../services/moderation');
const storageService = require('../services/storage');

router.post('/', async (req, res) => {
  const { url, content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  try {
    const result = await moderationService.classify(content);

    if (result === 'green') {
      storageService.save({ url, content, timestamp: new Date().toISOString() });
    }

    res.json({ result });
  } catch (error) {
    console.error('Error classifying content:', error);
    res.status(500).json({ error: 'Failed to classify content' });
  }
});

module.exports = router;
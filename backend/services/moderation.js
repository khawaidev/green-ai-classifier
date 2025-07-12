const axios = require('axios');

const classify = async (content) => {
  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'deepseek/deepseek-chat-v3-0324:free',
      messages: [
        { role: 'system', content: "You're a safety classifier AI. Return only 'green' if the page is safe and clean. Return 'red' if the page contains hate, explicit, misleading, or harmful content." },
        { role: 'user', content: content },
      ],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    let result = response.data.choices[0].message.content.toLowerCase().trim();

    if (result.includes('green')) {
        return 'green';
    } else if (result.includes('red')) {
        return 'red';
    } else {
        return 'red'; // Default to red if the response is not clear
    }

  } catch (error) {
    console.error('Error calling OpenRouter API:', error.response ? error.response.data : error.message);
    throw new Error('Failed to classify content with OpenRouter API');
  }
};

module.exports = { classify };
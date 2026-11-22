const express = require('express');
const cors = require('cors');
const axios = require('axios');

no const app = express();
app.use(cors());
app.use(express.json());

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

// Proxy für API-Requests
app.all('/api/*', async (req, res) => {
  try {
    const path = req.path.replace('/api', '');
    const url = `${API_URL}${path}`;
    
    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.API_KEY || ''
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log('');
  console.log('🎮 OneState Mod Menu App läuft auf Port ' + PORT);
  console.log('📱 Öffne den Browser: http://localhost:' + PORT);
  console.log('');
});

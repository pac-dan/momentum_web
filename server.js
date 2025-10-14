require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// VAPI Configuration API endpoint
app.get('/api/vapi-config', (req, res) => {
  // Add security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Return VAPI configuration
  res.json({
    publicKey: process.env.VAPI_PUBLIC_KEY,
    assistantId: process.env.VAPI_ASSISTANT_ID
  });
});

// Handle all other routes by serving index.html (for SPA routing if needed)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Momentum Digital website is running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});

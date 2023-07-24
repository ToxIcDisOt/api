const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();

// Load environment variables from .env file
dotenv.config();

// Define the route to handle the API request
app.get('/chatbot/api', async (req, res) => {
  const { uid, msg } = req.query;

  // Read the API key and bid from environment variables
  const apiKey = process.env.API_KEY;
  const bid = process.env.BID;

  const apiLink = `http://api.brainshop.ai/get?bid=${bid}&key=${apiKey}&uid=${uid}&msg=${msg}`;

  try {
    // Make the API request using Axios
    const response = await axios.get(apiLink);

    // Get the API response data
    const responseData = response.data;

    // Send the API response data back to the user
    res.json(responseData);
  } catch (error) {
    // Handle errors, if any
    res.status(500).json({ error: 'An error occurred while fetching the data.' });
  }
});

// Start the server
const port = 3000; // Change this to any port you prefer
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

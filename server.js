const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors'); // Add the cors module
const app = express();

// Load environment variables from .env file
dotenv.config();

// Add the CORS middleware to allow all origins
app.use(cors({
  origin: "*",
}));

// Define the route to handle the chatbot API request
app.get('/chatbot/api', async (req, res) => {
  const { uid, msg } = req.query;

  // Read the API key and bid from environment variables
  const apiKey = process.env.API_KEY;
  const bid = process.env.BID;

  const apiLink = `http://api.brainshop.ai/get?bid=${bid}&key=${apiKey}&uid=${uid}&msg=${msg}`;

  try {
    // Make the chatbot API request using Axios
    const response = await axios.get(apiLink);

    // Get the chatbot API response data
    const responseData = response.data;

    // Send the chatbot API response data back to the user
    res.json(responseData);
  } catch (error) {
    // Handle errors, if any
    res.status(500).json({ error: 'An error occurred while fetching the chatbot data.' });
  }
});

// Define the route to handle the weather API request
app.get('/utils/weather/api', async (req, res) => {
  const { location } = req.query;

  // Weather API base link and API key
  const weatherApiBaseLink = 'https://api.weatherapi.com/v1/current.json';
  const weatherApiKey = process.env.weatherApiKey;

  const weatherApiLink = `${weatherApiBaseLink}?key=${weatherApiKey}&q=${location}&aqi=yes`;

  try {
    // Make the weather API request using Axios
    const response = await axios.get(weatherApiLink);

    // Get the weather API response data
    const responseData = response.data;

    // Send the weather API response data back to the user
    res.json(responseData);
  } catch (error) {
    // Handle errors, if any
    res.status(500).json({ error: 'An error occurred while fetching the weather data.' });
  }
});

// Start the server
const port = 3000; // Change this to any port you prefer
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

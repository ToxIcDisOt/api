const express = require('express');
const app = express();

// Define the route to handle the API redirection
app.get('/chatbot/api', (req, res) => {
  const { uid, msg } = req.query;
  const apiLink = `http://api.brainshop.ai/get?bid=176598&key=pdF6xEyS6RZKh1uD&uid=${uid}&msg=${msg}`;

  // Redirect the user to the API link
  res.redirect(apiLink);
});

// Start the server
const port = 3000; // Change this to any port you prefer
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const mealRoutes = require('./routes/meals');

// Create an Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Custom middleware for logging request path and method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Define routes
app.use('/api/meals', mealRoutes);

// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to the database');
    
    // Start the Express app listening on the specified port
    app.listen(process.env.PORT, () => {
      console.log('Listening for requests on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

//loads variables from .env
require('dotenv').config();

//imports needed modules
const express = require('express');
const mongoose = require('mongoose');
const mealRoutes = require('./routes/meals');

//creates the express app
const app = express();

//middleware that parses json req's
app.use(express.json());

//middleware that logs request path and method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//defines routes
app.use('/api/meals', mealRoutes);

//connection to the mongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to the database');
    
    //starts the express app and listens to the port defined in .env
    app.listen(process.env.PORT, () => {
      console.log('Listening for requests on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

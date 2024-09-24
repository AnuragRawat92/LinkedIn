const express = require('express'); // Importing Express framework
const mongoose = require('mongoose'); // Importing Mongoose for MongoDB interaction
const bodyParser = require('body-parser'); // Importing body-parser to parse incoming request bodies
const profileRoutes = require('./routes/profile'); // Importing the profile routes
const cors = require('cors'); // Importing CORS middleware to handle cross-origin requests

const app = express(); // Creating an instance of Express
const PORT = process.env.PORT || 3000; // Setting the port, defaults to 3000 if not specified

app.use(cors()); // Enabling CORS for all routes

// Connect to MongoDB
mongoose.connect('mongodb+srv://anuragrawat7776:UmQk59oKGn9r7x4E@cluster0.fgkqq.mongodb.net/', {
  // Add options here if needed (e.g., useNewUrlParser, useUnifiedTopology)
})
.then(() => {
  console.log('Connected to MongoDB'); // Log success message
})
.catch(err => {
  console.log(err); // Log error message if connection fails
});

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define routes for profiles
app.use('/api/profiles', profileRoutes); // Mounting the profile routes to the /api/profiles path

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log server start message
});

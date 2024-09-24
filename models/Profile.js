// models/Profile.js
const mongoose = require('mongoose'); // Importing the Mongoose library to interact with MongoDB

// Defining the schema for the Profile model
const profileSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the profile owner (mandatory)
  url: { type: String, required: true }, // URL of the LinkedIn profile (mandatory)
  about: { type: String, required: true }, // About section content (mandatory)
  bio: { type: String, required: true }, // Bio content (mandatory)
  location: { type: String, required: true }, // Location of the profile owner (mandatory)
  followerCount: { type: Number, required: true }, // Number of followers (mandatory)
  connectionCount: { type: Number, required: true }, // Number of connections (mandatory)
  bioLine: { type: String, required: true } // A short line describing the profile (mandatory)
});

// Creating the Profile model using the defined schema
const Profile = mongoose.model('Profile', profileSchema);

// Exporting the Profile model for use in other parts of the application
module.exports = Profile;


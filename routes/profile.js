const express = require('express'); // Importing the Express framework
const Profile = require('../models/Profile'); // Importing the Profile model for MongoDB
const router = express.Router(); // Creating a new router instance

// POST API to create new LinkedIn profile data
router.post('/', async (req, res) => {
  console.log('Received data:', req.body); // Log received data for debugging

  try {
    // Destructuring the relevant fields from the request body
    const { name, url, about, bio, location, followerCount, connectionCount, bioLine } = req.body;

    // Creating a new instance of the Profile model
    const profile = new Profile({
      name,
      url,
      about,
      bio,
      location,
      followerCount,
      connectionCount,
      bioLine,
    });

    // Saving the profile to MongoDB
    await profile.save();
    
    // Sending a success response with the saved profile data
    res.status(201).json({ message: 'Profile saved successfully', profile });
  } catch (error) {
    // Logging any errors encountered during the save operation
    console.error('Error saving profile:', error); 
    
    // Sending an error response with the error details
    res.status(500).json({ message: 'Error saving profile', error });
  }
});
//  API to get LinkedIn profile data
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find(); 
    res.status(200).json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ message: 'Error fetching profiles', error });
  }
});
module.exports = router; // Exporting the router for use in other parts of the application


const puppeteer = require('puppeteer'); // Importing Puppeteer for web scraping
const axios = require('axios'); // Importing Axios for making HTTP requests

// Array of LinkedIn profile URLs to scrape
const profiles = [
  'https://www.linkedin.com/in/anjali-023b87231',
  'https://www.linkedin.com/in/mohd-taha-khan-b76656317',
  'https://www.linkedin.com/in/anurag-rawat-5a7341258'
];

async function scrapeProfileData() {
  // Launching a new browser instance
  const browser = await puppeteer.launch();
  const page = await browser.newPage(); // Creating a new page in the browser

  // Looping through each profile URL
  for (const profileUrl of profiles) {
    try {
      // Navigating to the profile URL and waiting for network idle
      await page.goto(profileUrl, { waitUntil: 'networkidle2' });

      // Extracting profile data using DOM selectors
      const name = await page.$eval('h1', el => el.innerText.trim()); // Extracting the name
      const location = await page.$eval('li.t-16.t-black.t-normal.inline-block', el => el.innerText.trim()); // Extracting the location
      const about = await page.$eval('section#about div.inline', el => el.innerText.trim()); // Extracting the about section
      const bio = await page.$eval('div[data-field="bio"]', el => el.innerText.trim()); // Extracting the bio
      const followerCount = await page.$eval('span[data-field="follower-count"]', el => el.innerText.trim()); // Extracting follower count
      const connectionCount = await page.$eval('span[data-field="connection-count"]', el => el.innerText.trim()); // Extracting connection count
      const bioLine = await page.$eval('div[data-field="bio-line"]', el => el.innerText.trim()); // Extracting the bio line

      // Creating an object to hold the scraped profile data
      const profileData = {
        name,
        url: profileUrl,
        about,
        bio,
        location,
        followerCount: parseInt(followerCount.replace(/,/g, '')) || 0, // Converting follower count to an integer
        connectionCount: parseInt(connectionCount.replace(/,/g, '')) || 0, // Converting connection count to an integer
        bioLine
      };

      console.log('Saving profile data:', profileData); // Logging the profile data to console
      
      // Sending a POST request to the API to save the profile data
      await axios.post('http://localhost:3000/api/profiles', profileData);

      // Adding a delay to avoid getting blocked by LinkedIn
      await new Promise(resolve => setTimeout(resolve, 2000)); // Delay of 2 seconds

    } catch (error) {
      console.error(`Error scraping profile ${profileUrl}:`, error.message); // Logging any errors encountered during scraping
    }
  }

  await browser.close(); // Closing the browser after scraping
}

// Initiating the scraping process
scrapeProfileData();


// Add an event listener to the scrape button with the ID 'scrapeButton'
document.getElementById('scrapeButton').addEventListener('click', () => {
    // Get the value of the text area with ID 'links', split by new lines, and filter out any empty links
    const links = document.getElementById('links').value.split('\n').filter(link => link);
  
    // Check if at least 3 valid links have been entered
    if (links.length >= 3) {
        // Send a message to the Chrome extension's background script to open profiles with the collected links
        chrome.runtime.sendMessage({
            action: 'openProfiles', // Action identifier
            links // The array of profile links to be processed
        });
    } else {
        // Alert the user if they have not entered enough links
        alert('Please enter at least 3 LinkedIn profile links.');
    }
});

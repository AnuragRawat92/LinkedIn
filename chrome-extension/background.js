// Listener for messages sent from other parts of the Chrome extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if the received message action is 'openProfiles'
    if (message.action === 'openProfiles') {
        // Loop through each link provided in the message
        message.links.forEach(link => {
            // Create a new tab in the browser for each LinkedIn profile link
            chrome.tabs.create({ url: link });
        });
    }
});

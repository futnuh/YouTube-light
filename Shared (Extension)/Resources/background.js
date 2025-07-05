// YouTubeLight Background Script

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("YouTubeLight: Received message from content script:", request);

    if (request.action === "contentScriptLoaded") {
        console.log("YouTubeLight: Content script loaded on:", request.url);
        sendResponse({ status: "acknowledged" });
    }
    
    return true; // Keep the message channel open for async response
});

// Log when background script loads
console.log("YouTubeLight: Background script loaded");

// Handle extension installation
browser.runtime.onInstalled.addListener((details) => {
    console.log("YouTubeLight: Extension installed/updated:", details.reason);
    
    if (details.reason === "install") {
        console.log("YouTubeLight: First time installation");
    } else if (details.reason === "update") {
        console.log("YouTubeLight: Extension updated");
    }
});

// YouTubeLight - Hide YouTube suggested content and sidebar elements

// Function to hide suggested elements
function hideSuggestedElements() {
    // Hide the entire secondary column (sidebar)
    const secondaryColumn = document.querySelector('#secondary');
    if (secondaryColumn) {
        secondaryColumn.style.display = 'none';
    }
    
    // Hide the secondary column container
    const secondaryColumnContainer = document.querySelector('#secondary-inner');
    if (secondaryColumnContainer) {
        secondaryColumnContainer.style.display = 'none';
    }
    
    // Hide related videos section
    const relatedVideos = document.querySelector('#related');
    if (relatedVideos) {
        relatedVideos.style.display = 'none';
    }
    
    // Hide shorts shelf
    const shortsShelf = document.querySelector('ytd-reel-shelf-renderer');
    if (shortsShelf) {
        shortsShelf.style.display = 'none';
    }
    
    // Hide shorts in search results
    const shortsResults = document.querySelectorAll('ytd-video-renderer[is-shorts]');
    shortsResults.forEach(short => {
        short.style.display = 'none';
    });
    
    // Hide "Shorts" tab in search results
    const shortsTab = document.querySelector('ytd-search-filter-group-renderer a[href*="shorts"]');
    if (shortsTab) {
        const tabContainer = shortsTab.closest('ytd-search-filter-group-renderer');
        if (tabContainer) {
            tabContainer.style.display = 'none';
        }
    }
    
    // Hide "Shorts" section in homepage
    const shortsSection = document.querySelector('ytd-rich-section-renderer[is-shorts]');
    if (shortsSection) {
        shortsSection.style.display = 'none';
    }
    
    // Hide "Shorts" button in navigation
    const shortsButton = document.querySelector('a[href="/shorts"]');
    if (shortsButton) {
        const buttonContainer = shortsButton.closest('ytd-guide-entry-renderer');
        if (buttonContainer) {
            buttonContainer.style.display = 'none';
        }
    }
}

// Function to expand main content area (disabled - keeping original video size)
function expandMainContent() {
    // Keep video at original size - don't expand to fill the space
    // This leaves the suggested content area blank instead of expanding the video
}

// Function to apply all hiding rules
function applyYouTubeLight() {
    if (window.youTubeLightEnabled !== false) {
        hideSuggestedElements();
        expandMainContent();
    }
}

// Run immediately
applyYouTubeLight();

// Set up observer for dynamic content
const observer = new MutationObserver((mutations) => {
    let shouldApply = false;
    
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Check if new nodes contain elements we want to hide
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.querySelector && (
                        node.querySelector('#secondary') ||
                        node.querySelector('ytd-reel-shelf-renderer') ||
                        node.querySelector('ytd-video-renderer[is-shorts]') ||
                        node.querySelector('a[href="/shorts"]')
                    )) {
                        shouldApply = true;
                    }
                }
            });
        }
    });
    
    if (shouldApply) {
        // Small delay to ensure DOM is fully updated
        setTimeout(applyYouTubeLight, 100);
    }
});

// Start observing
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Listen for navigation events (YouTube is a SPA)
let currentUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== currentUrl) {
        currentUrl = url;
        // Apply hiding rules after navigation
        setTimeout(applyYouTubeLight, 500);
    }
}).observe(document, { subtree: true, childList: true });

// Send message to background script to confirm extension is active
browser.runtime.sendMessage({ 
    action: "contentScriptLoaded", 
    url: window.location.href 
}).catch(() => {
    // Ignore errors if background script is not available
});

// Listen for messages from popup
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleExtension") {
        // Toggle the extension on/off
        if (window.youTubeLightEnabled === false) {
            window.youTubeLightEnabled = true;
            applyYouTubeLight();
            console.log("YouTubeLight: Extension enabled");
        } else {
            window.youTubeLightEnabled = false;
            // Show all hidden elements
            showAllElements();
            console.log("YouTubeLight: Extension disabled");
        }
        sendResponse({ enabled: window.youTubeLightEnabled });
    }
    return true;
});

// Function to show all hidden elements (for toggle functionality)
function showAllElements() {
    // Show secondary column
    const secondaryColumn = document.querySelector('#secondary');
    if (secondaryColumn) {
        secondaryColumn.style.display = '';
    }
    
    const secondaryColumnContainer = document.querySelector('#secondary-inner');
    if (secondaryColumnContainer) {
        secondaryColumnContainer.style.display = '';
    }
    
    // Show related videos
    const relatedVideos = document.querySelector('#related');
    if (relatedVideos) {
        relatedVideos.style.display = '';
    }
    
    // Show shorts shelf
    const shortsShelf = document.querySelector('ytd-reel-shelf-renderer');
    if (shortsShelf) {
        shortsShelf.style.display = '';
    }
    
    // Show shorts in search results
    const shortsResults = document.querySelectorAll('ytd-video-renderer[is-shorts]');
    shortsResults.forEach(short => {
        short.style.display = '';
    });
    
    // Show shorts tab
    const shortsTab = document.querySelector('ytd-search-filter-group-renderer a[href*="shorts"]');
    if (shortsTab) {
        const tabContainer = shortsTab.closest('ytd-search-filter-group-renderer');
        if (tabContainer) {
            tabContainer.style.display = '';
        }
    }
    
    // Show shorts section
    const shortsSection = document.querySelector('ytd-rich-section-renderer[is-shorts]');
    if (shortsSection) {
        shortsSection.style.display = '';
    }
    
    // Show shorts button
    const shortsButton = document.querySelector('a[href="/shorts"]');
    if (shortsButton) {
        const buttonContainer = shortsButton.closest('ytd-guide-entry-renderer');
        if (buttonContainer) {
            buttonContainer.style.display = '';
        }
    }
    
    // Note: No need to reset main content area since we're not modifying it
}

// Initialize extension state
window.youTubeLightEnabled = true;

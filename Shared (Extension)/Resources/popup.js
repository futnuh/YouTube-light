// YouTubeLight Popup Script

class YouTubeLightPopup {
    constructor() {
        this.statusIndicator = document.getElementById('status-indicator');
        this.currentUrl = document.getElementById('current-url');
        this.refreshBtn = document.getElementById('refresh-btn');
        this.toggleBtn = document.getElementById('toggle-btn');
        
        this.init();
    }
    
    async init() {
        this.setupEventListeners();
        await this.updateStatus();
    }
    
    setupEventListeners() {
        this.refreshBtn.addEventListener('click', () => {
            this.refreshCurrentTab();
        });
        
        this.toggleBtn.addEventListener('click', () => {
            this.toggleExtension();
        });
    }
    
    async updateStatus() {
        try {
            // Get current active tab
            const tabs = await browser.tabs.query({ active: true, currentWindow: true });
            const currentTab = tabs[0];
            
            if (currentTab) {
                this.currentUrl.textContent = this.getDomainFromUrl(currentTab.url);
                
                // Check if we're on YouTube
                if (currentTab.url && currentTab.url.includes('youtube.com')) {
                    this.statusIndicator.textContent = 'Active';
                    this.statusIndicator.className = 'status-indicator active';
                    this.toggleBtn.textContent = 'Disable';
                    this.toggleBtn.classList.remove('secondary');
                } else {
                    this.statusIndicator.textContent = 'Not on YouTube';
                    this.statusIndicator.className = 'status-indicator inactive';
                    this.toggleBtn.textContent = 'Enable';
                    this.toggleBtn.classList.add('secondary');
                }
            } else {
                this.statusIndicator.textContent = 'No tab found';
                this.statusIndicator.className = 'status-indicator inactive';
                this.currentUrl.textContent = '-';
            }
        } catch (error) {
            console.error('Error updating status:', error);
            this.statusIndicator.textContent = 'Error';
            this.statusIndicator.className = 'status-indicator inactive';
        }
    }
    
    getDomainFromUrl(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname;
        } catch {
            return 'Invalid URL';
        }
    }
    
    async refreshCurrentTab() {
        try {
            const tabs = await browser.tabs.query({ active: true, currentWindow: true });
            const currentTab = tabs[0];
            
            if (currentTab) {
                await browser.tabs.reload(currentTab.id);
                // Close popup after refresh
                window.close();
            }
        } catch (error) {
            console.error('Error refreshing tab:', error);
        }
    }
    
    async toggleExtension() {
        try {
            const tabs = await browser.tabs.query({ active: true, currentWindow: true });
            const currentTab = tabs[0];
            
            if (currentTab && currentTab.url && currentTab.url.includes('youtube.com')) {
                // Send message to content script to toggle
                await browser.tabs.sendMessage(currentTab.id, { action: 'toggleExtension' });
                
                // Update status after toggle
                setTimeout(() => {
                    this.updateStatus();
                }, 100);
            }
        } catch (error) {
            console.error('Error toggling extension:', error);
        }
    }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new YouTubeLightPopup();
});

// Log popup initialization
console.log('YouTubeLight: Popup script loaded');

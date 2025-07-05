# YouTubeLight

A modern Safari Web Extension for macOS that provides a cleaner YouTube experience by hiding distracting elements like suggested content, YouTube Shorts, and sidebar recommendations.

## Features

- **Hide Suggested Content**: Removes the right sidebar with suggested videos
- **Hide YouTube Shorts**: Removes Shorts from navigation, search results, and homepage
- **Hide Related Videos**: Removes related videos section on video pages
- **Expand Main Content**: Makes the main video area wider when sidebar is hidden
- **Toggle Functionality**: Enable/disable the extension on demand
- **Modern UI**: Clean, responsive popup interface
- **Real-time Updates**: Automatically adapts to YouTube's dynamic content

## Requirements

- macOS 11.0 (Big Sur) or later
- Safari 14.0 or later
- Xcode 12.0 or later (for development)

## Installation

### For Users

1. Clone or download this repository
2. Open `YouTubeLight.xcodeproj` in Xcode
3. Select the "macOS (App)" target
4. Build and run the project (⌘+R)
5. The app will install the Safari extension
6. Open Safari and go to Safari > Settings > Extensions
7. Enable "YouTubeLight" extension
8. Visit YouTube and enjoy a cleaner experience!

### For Developers

1. Clone the repository
2. Open `YouTubeLight.xcodeproj` in Xcode
3. Update the bundle identifier if needed
4. Build and run

## How It Works

The extension uses content scripts to modify YouTube's DOM:

- **Content Script** (`content.js`): Hides specific YouTube elements and expands the main content area
- **Background Script** (`background.js`): Handles extension lifecycle and messaging
- **Popup** (`popup.html/js/css`): Provides user interface for status and controls
- **Native Handler** (`SafariWebExtensionHandler.swift`): Handles native messaging between Safari and the extension

## Project Structure

```
YouTubeLight/
├── macOS (App)/              # Main macOS application
│   ├── AppDelegate.swift     # Modern Swift app delegate
│   ├── Main.storyboard       # Main window interface
│   └── YouTubeLight.entitlements
├── macOS (Extension)/        # Safari extension target
│   ├── Info.plist           # Extension configuration
│   └── YouTubeLight.entitlements
├── Shared (Extension)/       # Shared extension resources
│   ├── SafariWebExtensionHandler.swift  # Native message handler
│   └── Resources/           # Web extension files
│       ├── manifest.json    # Extension manifest (Manifest V3)
│       ├── content.js       # Content script for YouTube
│       ├── background.js    # Background script
│       ├── popup.html       # Extension popup
│       ├── popup.js         # Popup functionality
│       ├── popup.css        # Popup styling
│       ├── _locales/        # Localization
│       └── images/          # Extension icons
└── YouTubeLight.xcodeproj/  # Xcode project file
```

## Technical Details

### Modern Swift Features Used

- **Structured Concurrency**: Async/await for better performance
- **Modern Logging**: `os.log` framework with structured logging
- **Safe Unwrapping**: Guard statements and optional binding
- **Availability Checking**: `@available` attributes for macOS version compatibility

### Web Extension Features

- **Manifest V3**: Latest web extension manifest format
- **Content Scripts**: DOM manipulation for YouTube
- **Background Scripts**: Service worker for extension logic
- **Popup Interface**: Modern, responsive UI
- **Message Passing**: Communication between content and background scripts

### YouTube Elements Hidden

- `#secondary` - Main sidebar container
- `#secondary-inner` - Sidebar inner container
- `#related` - Related videos section
- `ytd-reel-shelf-renderer` - Shorts shelf
- `ytd-video-renderer[is-shorts]` - Shorts in search results
- `a[href="/shorts"]` - Shorts navigation links
- `ytd-rich-section-renderer[is-shorts]` - Shorts sections on homepage

## Development

### Building

```bash
# Open in Xcode
open YouTubeLight.xcodeproj

# Or build from command line
xcodebuild -project YouTubeLight.xcodeproj -scheme "macOS (App)" build
```

### Testing

1. Build and run the project
2. Enable the extension in Safari
3. Visit YouTube and verify elements are hidden
4. Test the popup interface
5. Test toggle functionality

### Debugging

- Use Safari's Web Inspector for content script debugging
- Check Console for extension logs
- Use Xcode's console for native handler logs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source. Please check the license file for details.

## Changelog

### v1.0.0 (Current)
- Initial release
- Hide YouTube suggested content and Shorts
- Modern Swift implementation
- macOS-only support
- Toggle functionality
- Modern popup interface

## Support

For issues and feature requests, please use the GitHub issues page.

---

**Note**: This extension is designed for personal use and to improve the YouTube viewing experience. It does not modify YouTube's core functionality and respects user privacy. 
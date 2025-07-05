#!/bin/bash

# YouTubeLight Project Cleanup Script
# This script helps clean up the Xcode project after removing iOS targets

echo "YouTubeLight Project Cleanup"
echo "============================"
echo ""

echo "Current project structure:"
ls -la
echo ""

echo "Note: The Xcode project file (project.pbxproj) still contains references to iOS targets."
echo "To properly clean up the project, you have two options:"
echo ""
echo "Option 1: Create a new Xcode project (Recommended)"
echo "1. Create a new Xcode project with Safari Web Extension template"
echo "2. Copy the updated files from this project"
echo "3. Add the macOS targets and configure them"
echo ""
echo "Option 2: Manually edit project.pbxproj"
echo "1. Open project.pbxproj in a text editor"
echo "2. Remove all iOS-related sections"
echo "3. Update build configurations"
echo ""
echo "For now, you can build the project by:"
echo "1. Opening YouTubeLight.xcodeproj in Xcode"
echo "2. Selecting only the macOS targets"
echo "3. Building and running the macOS app"
echo ""
echo "The extension functionality will work correctly even with iOS references in the project file." 
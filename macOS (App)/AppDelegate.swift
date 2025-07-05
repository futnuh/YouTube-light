//
//  AppDelegate.swift
//  macOS (App)
//
//  Created by Darran Edmundson on 2023-10-02.
//  Updated for modern Swift and macOS-only support
//

import Cocoa
import os.log

@main
class AppDelegate: NSObject, NSApplicationDelegate {
    
    private var mainWindow: NSWindow?
    
    func applicationDidFinishLaunching(_ notification: Notification) {
        os_log("YouTubeLight application launched", log: .default, type: .info)
        
        // Create and configure the main window
        setupMainWindow()
    }
    
    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }
    
    func applicationWillTerminate(_ notification: Notification) {
        os_log("YouTubeLight application terminating", log: .default, type: .info)
    }
    
    // MARK: - Private Methods
    
    private func setupMainWindow() {
        let windowRect = NSRect(x: 0, y: 0, width: 400, height: 300)
        mainWindow = NSWindow(
            contentRect: windowRect,
            styleMask: [.titled, .closable, .miniaturizable, .resizable],
            backing: .buffered,
            defer: false
        )
        
        guard let window = mainWindow else { return }
        
        window.title = "YouTubeLight"
        window.center()
        window.makeKeyAndOrderFront(nil)
        
        // Create a simple welcome view
        let welcomeView = NSView(frame: window.contentView?.bounds ?? .zero)
        welcomeView.wantsLayer = true
        welcomeView.layer?.backgroundColor = NSColor.controlBackgroundColor.cgColor
        
        let titleLabel = NSTextField(labelWithString: "YouTubeLight")
        titleLabel.font = NSFont.boldSystemFont(ofSize: 24)
        titleLabel.textColor = NSColor.labelColor
        titleLabel.translatesAutoresizingMaskIntoConstraints = false
        
        let subtitleLabel = NSTextField(labelWithString: "Clean YouTube Experience")
        subtitleLabel.font = NSFont.systemFont(ofSize: 14)
        subtitleLabel.textColor = NSColor.secondaryLabelColor
        subtitleLabel.translatesAutoresizingMaskIntoConstraints = false
        
        let descriptionLabel = NSTextField(labelWithString: "This extension hides YouTube Shorts, suggested content, and sidebar distractions to provide a cleaner viewing experience.")
        descriptionLabel.font = NSFont.systemFont(ofSize: 12)
        descriptionLabel.textColor = NSColor.secondaryLabelColor
        descriptionLabel.maximumNumberOfLines = 0
        descriptionLabel.lineBreakMode = .byWordWrapping
        descriptionLabel.translatesAutoresizingMaskIntoConstraints = false
        
        welcomeView.addSubview(titleLabel)
        welcomeView.addSubview(subtitleLabel)
        welcomeView.addSubview(descriptionLabel)
        
        NSLayoutConstraint.activate([
            titleLabel.centerXAnchor.constraint(equalTo: welcomeView.centerXAnchor),
            titleLabel.topAnchor.constraint(equalTo: welcomeView.topAnchor, constant: 40),
            
            subtitleLabel.centerXAnchor.constraint(equalTo: welcomeView.centerXAnchor),
            subtitleLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 8),
            
            descriptionLabel.leadingAnchor.constraint(equalTo: welcomeView.leadingAnchor, constant: 20),
            descriptionLabel.trailingAnchor.constraint(equalTo: welcomeView.trailingAnchor, constant: -20),
            descriptionLabel.topAnchor.constraint(equalTo: subtitleLabel.bottomAnchor, constant: 20)
        ])
        
        window.contentView = welcomeView
    }
}

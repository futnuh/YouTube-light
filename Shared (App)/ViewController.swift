//
//  ViewController.swift
//  Shared (App)
//
//  Created by Darran Edmundson on 2023-10-02.
//  Updated for modern Swift and macOS-only support
//

import Cocoa

class ViewController: NSViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // This view controller is not used in the macOS app
        // The main functionality is handled by AppDelegate
    }
    
    override var representedObject: Any? {
        didSet {
            // Update the view, if already loaded.
        }
    }
} 
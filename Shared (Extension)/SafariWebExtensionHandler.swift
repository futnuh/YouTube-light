//
//  SafariWebExtensionHandler.swift
//  Shared (Extension)
//
//  Created by Darran Edmundson on 2023-10-02.
//  Updated for modern Swift and macOS-only support
//

import SafariServices
import os.log

let SFExtensionMessageKey = "message"

class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {
    
    func beginRequest(with context: NSExtensionContext) {
        guard let item = context.inputItems.first as? NSExtensionItem else {
            os_log("No input items found in extension context", log: .default, type: .error)
            context.completeRequest(returningItems: [], completionHandler: nil)
            return
        }
        
        guard let message = item.userInfo?[SFExtensionMessageKey] else {
            os_log("No message found in extension item user info", log: .default, type: .error)
            context.completeRequest(returningItems: [], completionHandler: nil)
            return
        }
        
        os_log("Received message from browser.runtime.sendNativeMessage: %{public}@", log: .default, type: .info, String(describing: message))
        
        // Process the message and create response
        let response = processMessage(message)
        
        let responseItem = NSExtensionItem()
        responseItem.userInfo = [SFExtensionMessageKey: response]
        
        context.completeRequest(returningItems: [responseItem], completionHandler: nil)
    }
    
    private func processMessage(_ message: Any) -> [String: Any] {
        // Handle different message types
        if let messageDict = message as? [String: Any],
           let action = messageDict["action"] as? String {
            
            switch action {
            case "getStatus":
                return ["status": "active", "version": "1.0.0"]
            case "ping":
                return ["pong": true, "timestamp": Date().timeIntervalSince1970]
            default:
                return ["error": "Unknown action: \(action)"]
            }
        }
        
        return ["Response to": message]
    }
}

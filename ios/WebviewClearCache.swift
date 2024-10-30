import Foundation
import WebKit

@objc(WebviewClearCache)
class WebviewClearCache: NSObject {

  @objc(clearCache:withRejecter:)
  func clearCache(withResolver resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    // Clear URLCache
    URLCache.shared.removeAllCachedResponses()
    URLCache.shared.diskCapacity = 0
    URLCache.shared.memoryCapacity = 0
    HTTPCookieStorage.shared.removeCookies(since: Date.distantPast)

    DispatchQueue.main.async {
      var recordsDeleted = 0
      let semaphore = DispatchSemaphore(value: 0)
      let dataStore = WKWebsiteDataStore.default()

      dataStore.fetchDataRecords(ofTypes: WKWebsiteDataStore.allWebsiteDataTypes()) { records in
        guard !records.isEmpty else {
          // No records found, resolve immediately
          semaphore.signal()
          return
        }

        let totalRecords = records.count
        for record in records {
          dataStore.removeData(ofTypes: record.dataTypes, for: [record]) {
            recordsDeleted += 1
            // Check if all records have been processed
            if recordsDeleted == totalRecords {
              semaphore.signal()
            }
          }
        }
      }

      // Wait for all removals to complete
      DispatchQueue.global().async {
        semaphore.wait() // Run this in a background thread to avoid blocking the main thread

        // Resolve the promise if all removals are done
        if recordsDeleted > 0 {
            resolve("Cache cleared")
        } 
      }
    }
  }
}

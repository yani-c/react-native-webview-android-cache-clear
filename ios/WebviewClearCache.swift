import Foundation
import WebKit

@objc(WebviewClearCache)
class WebviewClearCache: NSObject {

  @objc(clearCache:withRejecter:)
  func clearCache(withResolver resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    URLCache.shared.removeAllCachedResponses()
    URLCache.shared.diskCapacity = 0
    URLCache.shared.memoryCapacity = 0

    HTTPCookieStorage.shared.removeCookies(since: Date.distantPast)

    var recordsDeleted = 0
    let semaphore = DispatchSemaphore(value: 0)

    WKWebsiteDataStore.default().fetchDataRecords(ofTypes: WKWebsiteDataStore.allWebsiteDataTypes()) { records in
      records.forEach { record in
        WKWebsiteDataStore.default().removeData(ofTypes: record.dataTypes, for: [record], completionHandler: {})
          recordsDeleted += 1
          // Signal the semaphore when done processing
          if recordsDeleted == records.count {
              semaphore.signal()
          }
      }
      if records.isEmpty {
        semaphore.signal()
      }
    }
    // Wait for all removals to complete
    semaphore.wait()

    resolve("Cache cleared")
  }
}

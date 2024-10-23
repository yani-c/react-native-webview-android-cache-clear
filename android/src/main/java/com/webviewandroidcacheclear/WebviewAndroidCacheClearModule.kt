package com.webviewandroidcacheclear

import android.webkit.WebView
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class WebviewAndroidCacheClearModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  fun clearCache(promise: Promise) {
    try {
      // Run the cache clearing on the UI thread
      getReactApplicationContext().runOnUiThread {
        try {
          // Clear the cache of the WebView
          WebView(getReactApplicationContext()).clearCache(true)
          promise.resolve("Cache cleared")
        } catch (e: Exception) {
          promise.reject("CACHE_CLEAR_ERROR", "Failed to clear cache", e)
        }
      }
    } catch (e: Exception) {
      promise.reject("CACHE_CLEAR_ERROR", "Failed to clear cache", e)
    }
  }

  companion object {
    const val NAME = "WebviewAndroidCacheClear"
  }
}

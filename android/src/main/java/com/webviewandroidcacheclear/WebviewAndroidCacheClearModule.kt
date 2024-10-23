package com.webviewandroidcacheclear

import android.webkit.WebView
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class WebviewAndroidCacheClearModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private var webView: WebView? = null

  override fun getName(): String {
    return NAME
  }

  fun setWebView(webView: WebView) {
    this.webView = webView
  }

  @ReactMethod
  fun clearCache(promise: Promise) {
      // Get the current activity from the React context
      val currentActivity = getCurrentActivity()
      currentActivity?.runOnUiThread {
          try {
              // Check that the webView is not null
              webView?.let {
                  it.clearCache(true) // Clear the existing WebView cache
                  promise.resolve("Cache cleared")
              } ?: run {
                  promise.reject("CACHE_CLEAR_ERROR", "WebView is not initialized")
              }
          } catch (e: Exception) {
              promise.reject("CACHE_CLEAR_ERROR", "Failed to clear cache", e)
          }
      } ?: run {
          promise.reject("CACHE_CLEAR_ERROR", "Current activity is null")
      }
  }

  companion object {
    const val NAME = "WebviewAndroidCacheClear"
  }
}

package com.webviewandroidcacheclear

import android.webkit.WebView
import android.webkit.CookieManager
import android.webkit.WebStorage

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
      WebStorage.getInstance().deleteAllData();
      CookieManager.getInstance().removeAllCookies(null);
      CookieManager.getInstance().flush();

      // Get the current activity from the React context
      val currentActivity = getCurrentActivity()
      currentActivity?.runOnUiThread {
          try {
            val webView = WebView(currentActivity)
            webView.clearCache(true)
            promise.resolve("Cache cleared")
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

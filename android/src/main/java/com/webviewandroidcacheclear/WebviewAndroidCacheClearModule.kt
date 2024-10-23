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
    getReactApplicationContext().runOnUiThread {
      try {
        // Verifica que el webView no sea nulo
        webView?.let {
          it.clearCache(true) // Limpia la caché del WebView existente
          promise.resolve("Cache cleared")
        } ?: run {
          promise.reject("CACHE_CLEAR_ERROR", "WebView is not initialized")
        }
      } catch (e: Exception) {
        promise.reject("CACHE_CLEAR_ERROR", "Failed to clear cache", e)
      }
    }
  }

  companion object {
    const val NAME = "WebviewAndroidCacheClear"
  }
}

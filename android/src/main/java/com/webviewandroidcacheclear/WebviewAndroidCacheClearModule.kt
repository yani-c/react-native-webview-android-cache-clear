package com.webviewandroidcacheclear

import android.webkit.CookieManager
import android.webkit.WebStorage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class WebviewAndroidCacheClearModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    fun clearCache(promise: Promise) {
        try {
            // Clear all WebView instances cache
            WebStorage.getInstance().deleteAllData()
            // Clear all the cookies
            CookieManager.getInstance().removeAllCookies { success ->
                if (success) {
                    promise.resolve("Cache cleared")
                } else {
                    promise.reject("CACHE_CLEAR_ERROR", "Failed to clear cookies")
                }
            }
            CookieManager.getInstance().flush()
        } catch (e: Exception) {
            promise.reject("CACHE_CLEAR_ERROR", "Failed to clear cache", e)
        }
    }

    companion object {
        const val NAME = "WebviewAndroidCacheClear"
    }
}

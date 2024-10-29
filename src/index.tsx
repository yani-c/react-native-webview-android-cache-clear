import { NativeModules, Platform } from 'react-native';
import { clearWebViewIOSCache } from 'react-native-webview-ios-cache-clear';

const LINKING_ERROR =
  `The package 'react-native-webview-clear-cache' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const WebviewClearCache = NativeModules.WebviewClearCache
  ? NativeModules.WebviewClearCache
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

// Function to clear cache based on the platform
const clearWebViewCache = async () => {
  if (Platform.OS === 'ios') {
    return clearWebViewIOSCache();
  } else if (Platform.OS === 'android') {
    return WebviewClearCache.clearCache();
  } else {
    throw new Error('Unsupported platform');
  }
};

export default clearWebViewCache;

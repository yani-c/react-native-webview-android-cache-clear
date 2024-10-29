import { NativeModules, Platform } from 'react-native';

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

export const clearWebViewCache = async () => {
  return WebviewClearCache.clearCache();
};

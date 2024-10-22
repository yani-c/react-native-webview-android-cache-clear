import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-webview-android-cache-clear' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const WebviewAndroidCacheClear = NativeModules.WebviewAndroidCacheClear
  ? NativeModules.WebviewAndroidCacheClear
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

// export function multiply(a: number, b: number): Promise<number> {
//   return WebviewAndroidCacheClear.multiply(a, b);
// }

export default WebviewAndroidCacheClear; // or you can export functions if needed

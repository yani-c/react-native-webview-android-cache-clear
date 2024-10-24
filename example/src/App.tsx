import { useRef, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import ReactNativeWebviewAndroidCacheClear from 'react-native-webview-android-cache-clear';
import WebView from 'react-native-webview';

export default function App() {
  const [result, setResult] = useState();
  const webviewRef = useRef(null); // Create a ref for the WebView

  const test = async () => {
    try {
      const res = await ReactNativeWebviewAndroidCacheClear.clearCache();
      console.log('sucess!!!', res); // Handle the success response
      setResult(res);
    } catch (error) {
      console.error('Error clearing cache:', error); // Handle the error
    }
  };

  const reloadWebView = () => {
    if (webviewRef.current) {
      webviewRef.current.reload(); // Reload the WebView
    }
  };

  return (
    <View style={styles.container}>
      <Text> Cache cleared result: {result}</Text>
      <View style={styles.buttons}>
        <Button title="Clear Cache" onPress={test} />
        <Button title="Reload WebView" onPress={reloadWebView} />
      </View>
      <WebView
        startInLoadingState
        source={{ uri: 'https://stage-dashboard.powerme.health' }}
        originWhitelist={['*']}
        containerStyle={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  webview: {
    display: 'flex',
    width: '100%',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 20,
  },
});

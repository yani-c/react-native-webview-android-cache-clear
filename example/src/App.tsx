import { useRef, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { clearWebViewCache } from 'react-native-webview-clear-cache';
import WebView from 'react-native-webview';

export default function App() {
  const [result, setResult] = useState();
  const webviewRef = useRef<WebView | null>(null); // Create a ref for the WebView

  const test = async () => {
    try {
      const res = await clearWebViewCache();
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
        source={{ uri: 'https://x.com/?lang=en' }}
        originWhitelist={['*']}
        containerStyle={styles.webview}
        ref={webviewRef}
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

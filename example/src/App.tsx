import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ReactNativeWebviewAndroidCacheClear from 'react-native-webview-android-cache-clear';

export default function App() {
  const [result] = useState();

  const test = async () => {
    try {
      const res = await ReactNativeWebviewAndroidCacheClear.clearCache();
      console.log('sucess!!!', res); // Handle the success response
    } catch (error) {
      console.error('Error clearing cache:', error); // Handle the error
    }
  };

  useEffect(() => {
    test();
  }, []); // Pass an empty array to run only once on mount

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

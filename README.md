# react-native-webview-clear-cache

clear webview cache on android and ios

## Installation

```sh
npm install react-native-webview-clear-cache
```

## Usage


```js
import { clearCache } from 'react-native-webview-clear-cache';

// ...

const result = await clearCache();
```


## Test example

To test the example project inside this project, you have to add the workspace example on the package.json
```json
  "workspaces": [
    "example"
  ],
```

and then run:

```bash
yarn
yarn example ios
yarn example android
```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

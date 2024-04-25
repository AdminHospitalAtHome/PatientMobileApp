/** @type {import('jest').Config} */

// noinspection SpellCheckingInspection
module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    '/node_modules/(?!(@react-native|react-native|react-native-button|react-native-gifted-chat|react-native-parsed-text|react-native-lightbox-v2|react-native-typing-animation|uuid|@flyerhq|react-native-image-viewing|react-native-chart-kit|@react-navigation)/)',
    '/node_modules/node-libs-react-native',
  ],
  setupFiles: ['./__mocks__/NativeModules.ts'],
};

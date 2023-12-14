/** @type {import('jest').Config} */

const config = {
  transformIgnorePatterns: ["node_modules/(?!(react-native|my-project|react-native-button)/)"],
}


module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: ["/node_modules/(?!(@react-native|react-native|react-native-button|react-native-gifted-chat|react-native-parsed-text|react-native-lightbox-v2|react-native-typing-animation|uuid|@flyerhq|react-native-image-viewing)/)","/node_modules/node-libs-react-native"],
};



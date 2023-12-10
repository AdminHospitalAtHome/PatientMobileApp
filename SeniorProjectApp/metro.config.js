const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    resolver: {
        extraNodeModules: {
            ...require('stream-browserify'),
            ...require('node-libs-react-native'),
            net: require.resolve('node-libs-react-native/mock/net'),
            tls: require.resolve('node-libs-react-native/mock/tls')
        }
    }
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

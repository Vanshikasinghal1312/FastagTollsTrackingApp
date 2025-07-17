/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */


// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true,
//       },
//     }),
//   },
// };
// const { getDefaultConfig } = require('metro-config');

// module.exports = (async () => {
//   const {
//     resolver: { sourceExts, assetExts }
//   } = await getDefaultConfig();

//   return {
//     transformer: {
//       assetPlugins: ['expo-asset/tools/hashAssetFiles'],
//     },
//     resolver: {
//       assetExts: [...assetExts, 'png'],
//       sourceExts,
//     },
//   };
// })();
// metro.config.js
const { getDefaultConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;



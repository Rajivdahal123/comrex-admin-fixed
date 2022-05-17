/* eslint-disable import/no-extraneous-dependencies */
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// const baseUrl = 'https://comrex-api-dev.panthermediasystem.net';
// // const baseUrl = 'http://localhost:8000';
// module.exports = withBundleAnalyzer({
//   poweredByHeader: false,
//   trailingSlash: false,
//   basePath: '',
//   // The starter code load resources from `public` folder with `router.basePath` in React components.
//   // So, the source code is "basePath-ready".
//   // You can remove `basePath` if you don't need it.
//   reactStrictMode: true,
//   env: {
//     REACT_APP_API_URL: `${baseUrl}/api`,
//   },
// });


require('dotenv').config()
const webpack = require('webpack');

module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    return config
  }
}
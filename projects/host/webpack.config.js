const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const { webpack } = require('webpack');
const { ModuleFederationPlugin } = require("webpack").container;
module.exports = withModuleFederationPlugin({

  // We are using Dynamic loading of MFEs so this entry is not needed.
  // remotes: {
  //   "mfe": "http://localhost:4201/remoteEntry.js"
  // },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});

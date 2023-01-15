const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const { ModuleFederationPlugin } = require("webpack").container;
module.exports = withModuleFederationPlugin({

  //Expose the remote component
  name: 'stats',
  filename: "statsRemoteEntry.js",
  exposes: {
    './Component': 'src/app/app.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  }
});

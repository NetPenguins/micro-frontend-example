const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const { webpack } = require('webpack');
const { ModuleFederationPlugin } = require("webpack").container;
// module.exports = withModuleFederationPlugin({

//       remotes: {
//         "stats": "https://netpenguins-ideal-guide-q7wqj569prvfjw9-4201.preview.app.github.dev/statsRemoteEntry.js"
//       },

//       shared: {
//         ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
//       },
      
//     }, {
//       devServer: {
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
//           "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
//         }
//       },
//     });

module.exports = {
  // output: {
  //   publicPath: 'http://localhost:4200/',
  //   uniqueName: 'home'
  // },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        "stats": "http://localhost:4201/statsRemoteEntry.js"
      },

      shared: {
        ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
      }
    })
  ],
  devServer: {
    proxy: {
      '/stats' : {
        target: "http://localhost:4201/statsRemoteEntry.js",
        secure: true
      }
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*"
    }
  },
};

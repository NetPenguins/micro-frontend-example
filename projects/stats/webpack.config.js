const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const { ModuleFederationPlugin } = require("webpack").container;
module.exports = withModuleFederationPlugin({

  name: 'stats',
  filename: "statsRemoteEntry.js",
  exposes: {
    './Component': './projects/stats/src/app/app.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  }
});
// module.exports = {
//   plugins: [
//     new ModuleFederationPlugin({
//       name: 'stats',
//       filename: "statsRemoteEntry.js",
//       exposes: {
//         './Component': './projects/stats/src/app/app.component.ts',
//       },

//       shared: {
//         ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
//       }
//     })
//   ],
//   devServer: {
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "*",
//       "Access-Control-Allow-Headers": "*"
//     }
//   },
// };


const devConfig = require("./config/webpack.dev");
const prodConfig = require("./config/webpack.prod");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const resultantConfig = isProduction ? prodConfig : devConfig;
  return resultantConfig;
};
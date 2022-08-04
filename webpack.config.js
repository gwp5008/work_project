const path = require("path");

module.exports = {
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
};

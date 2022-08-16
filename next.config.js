const path = require("path");

module.exports = {
  env: {
    PASSWORD_PROTECT: process.env.NEXT_PUBLIC_ENVIRONMENT === "production",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true, svgo: false } }],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      next: path.resolve("./node_modules/next"),
      react: path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom"),
    };

    return config;
  },
};

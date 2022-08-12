const withPlugins = require("next-compose-plugins");

const plugins = [
  [
    {
      webpack5: true,
      reactStrictMode: true,
    },
  ],
];

const nextConfig = {
  distDir: "build",
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  env: {
    PASSWORD_PROTECT: process.env.NODE_ENV === "production",
  },
};
module.exports = withPlugins(plugins, nextConfig);

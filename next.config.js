const withPlugins = require("next-compose-plugins");

/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

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
  eslint: {
    dirs: ["."],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: "",
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
module.exports = withBundleAnalyzer(withPlugins(plugins, nextConfig));

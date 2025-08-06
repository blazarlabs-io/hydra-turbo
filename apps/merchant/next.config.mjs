// /** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: true,
//   transpilePackages: ["@repo/ui"],
// };

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  experimental: {
    // Enable async WASM loading (recommended)
    wasm: true,
  },
  webpack(config, options) {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true, // 🔑 Required for Lucid and UPLC WASM
    };

    return config;
  },
};

export default withNextIntl(nextConfig);

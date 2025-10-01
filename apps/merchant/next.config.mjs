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

    // Handle native modules and binary files
    config.module.rules.push({
      test: /\.node$/,
      use: "node-loader",
    });

    // Exclude native modules from client-side bundle
    config.externals = config.externals || [];
    config.externals.push({
      "node-beacon-scanner": "commonjs node-beacon-scanner",
      noble: "commonjs noble",
      "@abandonware/bluetooth-hci-socket":
        "commonjs @abandonware/bluetooth-hci-socket",
    });

    return config;
  },
};

export default withNextIntl(nextConfig);

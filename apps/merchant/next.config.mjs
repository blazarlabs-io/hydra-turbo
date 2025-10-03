// /** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: true,
//   transpilePackages: ["@repo/ui"],
// };

import createNextIntlPlugin from "next-intl/plugin";
import fs from "node:fs";
import path from "node:path";

const withNextIntl = createNextIntlPlugin();

const isProd = process.env.NODE_ENV === "production";

function readAllowlist() {
  try {
    // Try multiple possible paths for the allowlist file
    const possiblePaths = [
      path.join(process.cwd(), "csp.allowlist.json"), // If running from apps/merchant
      path.join(process.cwd(), "apps/merchant/csp.allowlist.json"), // If running from root
    ];

    for (const p of possiblePaths) {
      try {
        const raw = fs.readFileSync(p, "utf8");
        console.log(`Loaded CSP allowlist from: ${p}`);
        return JSON.parse(raw);
      } catch {
        continue;
      }
    }
    throw new Error("Allowlist file not found");
  } catch (error) {
    console.warn(`Failed to load CSP allowlist: ${error.message}`);
    return { connect: [], img: [], script: [], style: [], font: [], frame: [] };
  }
}

function cspFromAllowlist(allow) {
  // Base policy: strict defaults; selectively widen via allowlist.
  // Avoid 'unsafe-eval'. Allow 'unsafe-inline' in style only if absolutely necessary.
  const self = "'self'";
  const blob = "blob:";
  const data = "data:";

  const connect = [self, ...allow.connect];
  const img = [self, data, blob, ...allow.img];
  const script = [self, ...allow.script];
  const style = [self, "'unsafe-inline'", ...allow.style]; // Consider removing 'unsafe-inline' after auditing
  const font = [self, data, ...allow.font];
  const frame = ["'none'", ...allow.frame]; // default deny; add needed frames explicitly

  const directives = [
    ["default-src", [self]],
    ["base-uri", [self]],
    ["frame-ancestors", ["'none'"]],
    ["form-action", [self]],
    ["connect-src", Array.from(new Set(connect))],
    ["img-src", Array.from(new Set(img))],
    ["script-src", Array.from(new Set(script))],
    ["style-src", Array.from(new Set(style))],
    ["font-src", Array.from(new Set(font))],
    ["frame-src", Array.from(new Set(frame))],
    ["object-src", ["'none'"]],
    ["upgrade-insecure-requests", []],
  ];

  return directives
    .map(([k, v]) => (v.length ? `${k} ${v.join(" ")}` : k))
    .join("; ");
}

const allow = readAllowlist();
const CSP = cspFromAllowlist(allow);

const securityHeaders = [
  // Core hardening
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
  // Modern replacement for many feature-* headers
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "camera=()",
      "geolocation=()",
      "gyroscope=()",
      "microphone=()",
      "payment=()",
      "usb=()",
    ].join(", "),
  },
  // HSTS only for production over HTTPS
  ...(isProd
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains; preload",
        },
      ]
    : []),
  // Explicitly disable legacy XSS filter to avoid false sense of security
  { key: "X-XSS-Protection", value: "0" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  experimental: {
    // Enable async WASM loading (recommended)
    // wasm: true, // This option is not valid in Next.js 15
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
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

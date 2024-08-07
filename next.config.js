/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { theme: "DEFAULT", currency: "USD" },
  publicRuntimeConfig: { theme: "DEFAULT", currency: "USD" },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ui-lib.com" },
      { protocol: "https", hostname: "pariah-e2602.web.app" },
      { protocol: "https", hostname: "pariahs.fans" },
      // Firebase Local (Dev Only)
      { protocol: "http", hostname: "127.0.0.1", port: "9199" },
    ]
  }
};

module.exports = nextConfig;

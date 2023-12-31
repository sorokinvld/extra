/** @type {import('next').NextConfig} */
const { i18n } = require("./i18next.config");

const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  i18n,
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
};

module.exports = nextConfig;

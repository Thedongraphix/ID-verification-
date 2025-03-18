/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Exclude backend files from Next.js build
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Explicitly exclude the backend directory
  webpack: (config, { isServer }) => {
    config.externals = [...(config.externals || []), 'backend'];
    return config;
  },
}

module.exports = nextConfig

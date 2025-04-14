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
  // Allow Clerk's domains for images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: '*.clerk.accounts.dev',
      },
    ],
  },
  // Explicitly exclude the backend directory
  webpack: (config, { isServer }) => {
    config.externals = [...(config.externals || []), 'backend'];
    return config;
  },
}

module.exports = nextConfig

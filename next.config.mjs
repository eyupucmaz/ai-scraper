/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Needed for Docker deployment
  experimental: {
    turbo: {
      // Configure turbopack
      loaders: {
        '.js': ['tsx'],
      },
    },
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};

export default nextConfig;
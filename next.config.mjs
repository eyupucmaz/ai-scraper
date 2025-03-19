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
};

export default nextConfig;
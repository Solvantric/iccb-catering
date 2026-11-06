/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.iccbbg.com',
      },
      {
        protocol: 'https',
        hostname: 'iccbbg.com',
      },
      {
        protocol: 'https',
        hostname: 'www.just-style.com',
      },
    ],
  },
};

export default nextConfig;

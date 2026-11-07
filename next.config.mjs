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
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'img.magnific.com',
      },
      {
        protocol: 'https',
        hostname: 'betterwork.org',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
    ],
  },
};

export default nextConfig;

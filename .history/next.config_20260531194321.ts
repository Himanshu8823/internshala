import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'internshala.com',
      },
      {
        protocol: 'https',
        hostname: 'internshala-uploads.internshala.com',
      },
    ],
  },
};

export default nextConfig;

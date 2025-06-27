import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/leaderboard',
        destination: 'http://localhost:5000/api/leaderboard',
      },
    ];
  },
};

export default nextConfig;

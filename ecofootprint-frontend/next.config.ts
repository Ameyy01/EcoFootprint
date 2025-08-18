import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/leaderboard',
        destination: process.env.BACKEND_URL || 'https://ecofootprint-backend.onrender.com/api/leaderboard',
      },
    ];
  },
};

export default nextConfig;

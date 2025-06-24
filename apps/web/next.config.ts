import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://assets.leetcode.com/**'),
      new URL('https://lh3.googleusercontent.com/**'),
      new URL('https://avatars.githubusercontent.com/**'),
    ]
  }
};

export default nextConfig;

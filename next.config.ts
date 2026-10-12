import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // YouTube lecture thumbnails on the home page
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
};

export default nextConfig;

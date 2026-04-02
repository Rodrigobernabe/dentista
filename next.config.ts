import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración estricta para GitHub Pages
  output: "export",
  images: {
    unoptimized: true, // Github Pages no tiene un servidor Node.js
  },
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;

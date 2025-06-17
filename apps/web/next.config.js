/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=43200",
          },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [], // Add your image domains (e.g., images.unsplash.com)
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Pages — emits a fully static `out/` directory.
  output: 'export',
  // Cloudflare Pages serves each route as its own directory (`/menu/index.html`).
  trailingSlash: true,
  images: {
    // next/image optimization requires a server; disable it for static export.
    unoptimized: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;

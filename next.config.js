/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export disabled to enable API Routes for secure authentication
  // output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '',
  trailingSlash: true,
}

module.exports = nextConfig

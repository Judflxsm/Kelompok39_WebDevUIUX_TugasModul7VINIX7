// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Aktifkan Server Actions (default di Next.js 14, tapi eksplisit lebih aman)
  experimental: {
    serverActions: {
      // Bolehkan action dari origin yang sama
      allowedOrigins: ['localhost:3000'],
    },
  },

  // Optionally suppress specific warnings
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

module.exports = nextConfig
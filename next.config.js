/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com', 'admin.handballbelgium.be'],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

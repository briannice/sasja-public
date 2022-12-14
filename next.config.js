/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com', 'admin.handballbelgium.be'],
  },
  async redirects() {
    return [
      {
        source: '/fanshop',
        destination: 'https://teamfashion.be/nl/178-sasja-hc',
        permanent: true,
      },
      { source: '/facebook', destination: 'https://www.facebook.com/SasjaHC', permanent: true },
      { source: '/instagram', destination: 'https://www.instagram.com/sasjahc/', permanent: true },
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com', 'admin.handballbelgium.be', 'avzlamsrtp.cloudimg.io'],
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
  async rewrites() {
    return [
      {
        source: '/tools/wedstrijdblad',
        destination: '/static/html/wedstrijdblad.html',
      },
      {
        source: '/nieuwsbrief',
        destination: '/static/html/nieuwsbrief.html',
      },
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

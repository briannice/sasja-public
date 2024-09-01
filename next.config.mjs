/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'admin.handballbelgium.be',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'avzlamsrtp.cloudimg.io',
        port: '',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/fanshop',
        destination: 'https://team.jako.com/be-nl/team/hc_sasja/club_teamline/',
        permanent: true,
      },
      {
        source: '/facebook',
        destination: 'https://www.facebook.com/SasjaHC',
        permanent: true,
      },
      {
        source: '/instagram',
        destination: 'https://www.instagram.com/sasjahc/',
        permanent: true,
      },
      { source: '/trooper', destination: 'https://www.trooper.be/sasjahc', permanent: true },
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
}

export default nextConfig

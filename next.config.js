/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'admin.handballbelgium.be',
      'avzlamsrtp.cloudimg.io',
    ],
    unoptimized: true, // Disables built-in image optimization
  },
  async redirects() {
    return [
      {
        source: '/fanshop',
        destination: 'https://team.jako.com/be-nl/team/hc_sasja/club_teamline/',
        permanent: true,
      },
      { source: '/facebook', destination: 'https://www.facebook.com/SasjaHC', permanent: true },
      { source: '/instagram', destination: 'https://www.instagram.com/sasjahc/', permanent: true },
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
        source: '/tools/aanduidingen',
        destination: '/static/html/aanduidingen.html',
      },
      {
        source: '/nieuwsbrief',
        destination: '/static/html/nieuwsbrief.html',
      },
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
  // enable this when using HandballNL caching
  // experimental: {
  //   workerThreads: false,
  //   cpus: 1
  // }
}

module.exports = nextConfig

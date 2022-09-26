import Layout from '@/components/layout/Layout'
import { AppProps } from 'next/app'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import React from 'react'

import '@/styles/main.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </Layout>
  )
}

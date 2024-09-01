import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import React, { useEffect } from 'react'

import Layout from '@/components/layout/Layout'

import '@/styles/main.css'

const pageview = (url: string) => {
  window.gtag('config', process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, {
    page_path: url,
  })
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

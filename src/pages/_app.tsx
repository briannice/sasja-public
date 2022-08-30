import type { AppProps } from 'next/app'
import React from 'react'

import '@/styles/main.css'
import Layout from '@/components/layout/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

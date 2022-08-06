import type { AppProps } from 'next/app'
import React from 'react'

import '@sasja-public/styles/main.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

import Layout from '@/components/layout/Layout'
import { AppProps } from 'next/app'
import React, { useEffect } from 'react'

import '@/styles/main.css'
import { useRouter } from 'next/router'

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

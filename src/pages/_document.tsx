import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="icon" type="image/x-icon" href="/logo.png"></link>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Kanit:wght@500;700&family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap"
                    rel="stylesheet"
                />
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
                    }}
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

import Head from 'next/head'

import React from 'react'

import TicketsAndAbos from '@/components/home/TicketsAndAbos'

export default function Home() {
  return (
    <>
      <Head>
        <title>Sasja HC | Tickets</title>
      </Head>
      <main>
        <h1 className="sr-only">Sasja HC | Home</h1>
        <TicketsAndAbos />
      </main>
    </>
  )
}

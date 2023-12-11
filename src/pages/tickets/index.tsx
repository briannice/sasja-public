import Head from "next/head";
import TicketsAndAbos from "@/components/home/TicketsAndAbos";
import React from "react";

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
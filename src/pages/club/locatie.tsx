import Head from 'next/head'
import React from 'react'

const locations = [
    {
        name: 'Sporthal Sorghvliedt',
        street: 'Krijgsbaan 20',
        city: '2660 Hoboken',
    },
    {
        name: 'Sporthal Fort VIII',
        street: 'Hoofdfrontweg 9',
        city: '2660 Hoboken',
    },
    {
        name: 'Sporthal Notelaar',
        street: 'Oudestraat 51',
        city: '2660 Hoboken',
    },
    {
        name: 'Sporthal Kiel',
        street: 'Emiel Vloorsstraat 2',
        city: '2020 Antwerpen',
    },
]

export default function Locations() {
    return (
        <>
            <Head>
                <title>Sasja HC | Locaties</title>
            </Head>
            <main className="container">
                <h1 className="title1 mt-8">Locaties</h1>
                <section className="mt-8 grid grid-cols-1 gap-8 laptop:grid-cols-2">
                    <h2 className="sr-only">Sporthallen</h2>
                    {locations.map((location) => (
                        <section key={location.name} className="card p-8">
                            <h3 className="title2">{location.name}</h3>
                            <div className="mt-8 flex flex-col items-center space-y-2">
                                <p className="text-lg">{location.street}</p>
                                <p className="text-lg">{location.city}</p>
                            </div>
                        </section>
                    ))}
                </section>
            </main>
        </>
    )
}

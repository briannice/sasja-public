import Container from '@/components/Container'
import Link from '@/components/Link'
import Head from 'next/head'
import React from 'react'
import { RiExternalLinkLine } from 'react-icons/ri'

const trainings = [
    {
        day: 'Maandag',
        data: [
            {
                teams: ['JM12', 'JM14'],
                start: '18u00',
                end: '19u30',
                location: 'Sporthal Notelaar',
            },
            {
                teams: ['JM16', 'J18 (1e jaars)'],
                start: '17u30',
                end: '19u00 of 19u30 (cardio/kracht)',
                location: 'Sporthal Sorghvliedt',
            },
            {
                teams: ['J18 (2e jaars)'],
                start: '18u30',
                end: '20u30',
                location: 'Sporthal Sorghvliedt',
            },
        ],
    },
    {
        day: 'Dinsdag',
        data: [
            {
                teams: ['JM16'],
                start: '18u00',
                end: '19u30',
                location: 'Sporthal Notelaar',
            },
            {
                teams: ['J18'],
                start: '17u30',
                end: '19u00 of 19u30 (cardio/kracht)',
                location: 'Sporthal Sorghvliedt',
            },
        ],
    },
    {
        day: 'Woensdag',
        data: [
            {
                teams: ['JM8'],
                start: '13u30',
                end: '14u30',
                location: 'Sporthal Notelaar',
            },
            {
                teams: ['JM10'],
                start: '14u30',
                end: '16u00',
                location: 'Sporthal Notelaar',
            },
            {
                teams: ['JM12'],
                start: '15u00',
                end: '16u30',
                location: 'Sporthal Sorghvliedt',
            },
            {
                teams: ['JM14'],
                start: '16u30',
                end: '18u00',
                location: 'Sporthal Sorghvliedt',
            },
            {
                teams: ['J18 (2e jaars)'],
                start: '18u30',
                end: '20u30',
                location: 'Sporthal Sorghvliedt',
            },
        ],
    },
    {
        day: 'Donderdag',
        data: [
            {
                teams: ['JM12'],
                start: '17u30',
                end: '19u00',
                location: 'Sporthal Fort VIII',
            },
            {
                teams: ['JM14'],
                start: '17u30',
                end: '19u00',
                location: 'Sporthal Kiel',
            },
            {
                teams: ['JM16'],
                start: '17u30',
                end: '19u00',
                location: 'Sporthal Sorghvliedt',
            },
            {
                teams: ['J18'],
                start: '19u00',
                end: '20u30',
                location: 'Sporthal Sorghvliedt',
            },
        ],
    },
]

export default function TrainingsPage() {
    return (
        <>
            <Head>
                <title>Sasja HC | Wedstrijden</title>
            </Head>
            <main>
                <h1 className="title1 mt-8">Trainingen</h1>
                <Container className="space-y-8">
                    {trainings.map(({ data, day }) => (
                        <section key={day} className="card p-4">
                            <h2 className="title2">{day}</h2>
                            <div className="mt-8 divide-y divide-light">
                                {data.map((training, i) => (
                                    <div
                                        key={i}
                                        className="grid grid-cols-1 gap-4 py-4 first:pt-0 last:pb-0 tablet:grid-cols-3 tablet:gap-8"
                                    >
                                        <div className="flex flex-col items-center space-y-1">
                                            {training.teams.map((team) => (
                                                <p key={team} className="font-kanit">
                                                    {team}
                                                </p>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <p className="text-dark">{`${training.start} tot ${training.end}`}</p>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <Link
                                                href="/club/locatie"
                                                className="flex items-center space-x-2 text-info underline"
                                            >
                                                <span>{training.location}</span>
                                                <RiExternalLinkLine />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </Container>
            </main>
        </>
    )
}

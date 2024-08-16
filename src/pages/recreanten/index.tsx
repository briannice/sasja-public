import Head from 'next/head'
import React from 'react'
import Container from "@/components/Container";
import Link from "@/components/Link";
import {RiExternalLinkLine} from "react-icons/ri";
import Image from "next/image";

const trainings = [
    {
        day: 'Donderdag',
        data: [
            {
                teams: ['Recreanten'],
                start: '20u30',
                end: '22u00',
                location: 'Sporthal Sorghvliedt',
            }
        ],
    },
]

export default function index() {
    return (
        <>
            <Head>
                <title>Sasja HC | Recreanten</title>
            </Head>
            <main>
                <h1 className="title1 mt-8">Recreanten</h1>
                <div className="cms-content">
                <figure>
                    <Image src="/recreanten/team.jpg" layout="fill" objectFit="contain" alt="best team in the world"/>
                </figure>
                </div>
                <h2 className="title1 mt-8">Trainingen</h2>
                <Container className="space-y-8">
                    {trainings.map(({data, day}) => (
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
                                                <RiExternalLinkLine/>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </Container>
                <h2 className="title1 mt-8">Info</h2>
                <Container card={true} className="card-text">
                        <h2>Ontdek de Passie van Handbal met Onze Recreantenploeg!</h2>
                        <p>Ben jij op zoek naar een leuke en energieke manier om actief te blijven en nieuwe vrienden te
                            maken? </p>
                    <p>Zoek niet verder! Onze recreantenploeg heet jou van harte welkom!</p>
                        <h2>Doe Vandaag Nog Mee!</h2>
                        <p>Of je nu een oud-handbalprof bent of gewoon nieuwsgierig bent naar deze geweldige sport,
                            onze recreantenploeg staat open voor iedereen die wil deelnemen: <a href="mailto:recreanten@sasja-antwerpen.be">meld je aan</a> en ontdek de sfeer, het
                            plezier en de vriendschap binnen het handbal.</p>
                        <p>Laten we samen plezier hebben, bewegen en de magie van handbal beleven! Tot gauw!️</p>
                </Container>
            </main>
        </>
    )
}


import Head from 'next/head'
import React from 'react'
import Container from "@/components/Container";
import Link from "@/components/Link";
import {RiExternalLinkLine} from "react-icons/ri";

const trainings = [
    {
        day: 'Donderdag',
        data: [
            {
                teams: ['Recreanten'],
                start: '20u00',
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
                    <div className="cms-content">
                        <h2>Ontdek de Passie van Handbal met Onze Recreantenploeg!</h2>
                        <p>Ben jij op zoek naar een leuke en energieke manier om actief te blijven en nieuwe vrienden te
                            maken? Zoek niet verder! Onze recreantenploeg heet jou van harte welkom om de opwinding en
                            dynamiek van deze geweldige sport te ervaren.</p>
                        <h2>Waarom Kiezen voor Onze Recreantenploeg?</h2>
                        <h3>Gezellige sfeer</h3>
                        <p>We geloven in het creëren van een omgeving waarin iedereen zich welkom voelt. Ongeacht je
                            ervaring of vaardigheidsniveau, je zult merken dat onze ploeg een hechte groep is die
                            samenkomt om plezier te hebben.</p>
                        <h3>Beweeg en blijf fit</h3>
                        <p>Handbal is niet alleen leuk, maar ook een fantastische manier om in vorm te blijven. Je zult
                            genieten van de mix van cardio, kracht en behendigheid die handbal biedt, terwijl je de
                            alledaagse stress vergeet.</p>
                        <h3>Leer nieuwe vaardigheden</h3>
                        <p>Of je nu een doorgewinterde handbalspeler bent of nog nooit een bal hebt aangeraakt, onze
                            ervaren coach staat klaar om je te helpen. Leer de basisprincipes of verfijn je techniek –
                            er is altijd ruimte om te groeien.</p>
                        <h3>Wedstrijdplezier</h3>
                        <p>Als je van een vleugje competitie houdt, zul je dol zijn op onze recreantenwedstrijden. Samen
                            met gelijkgestemde teamgenoten krijg je de kans om je vaardigheden in de praktijk te brengen
                            tijdens vriendschappelijke wedstrijden en toernooien.</p>
                        <h3>Sociale evenementen</h3>
                        <p>Onze ploeg is meer dan alleen handbal. We organiseren binnen de club regelmatig sociale
                            evenementen waardoor je de kans krijgt om je medespelers buiten het veld te leren
                            kennen.</p>
                        <h2>Doe Vandaag Nog Mee!</h2>
                        <p>Of je nu een oude handbalprof bent of gewoon nieuwsgierig bent naar deze geweldige sport,
                            onze recreantenploeg staat open voor iedereen die wil deelnemen. Meld je aan en ontdek het
                            plezier, de vriendschap en de gezondheidsvoordelen van handbal.</p>
                        <p>Neem <a href="mailto:recreanten@sasja-antwerpen.be">contact</a> met ons op en sluit je aan
                            bij onze enthousiaste
                            recreantenploeg of kom een bezoekje brengen op onze training.</p>
                        <p>Laten we samen plezier hebben, bewegen en de magie van handbal beleven! Tot gauw!️</p>
                    </div>
                </Container>
            </main>
        </>
    )
}


import Container from '@/components/Container'
import Link from '@/components/Link'
import clsx from 'clsx'
import Head from 'next/head'
import React from 'react'
import {
    RiArrowRightSLine,
    RiBallPenLine,
    RiBarChartBoxLine,
    RiCalendar2Line,
} from 'react-icons/ri'

const info = [
    {
        name: 'Jeugdbeleidsplan',
        text: 'Bekijk het jeugdbeleidsplan van Sasja.',
        link: '/jeugd/jeugdbeleidsplan',
        color: 'btn-primary',
        icon: RiBarChartBoxLine,
    },
    {
        name: 'Trainingen',
        text: 'Bekijk hier de trainingsmomenten van al onze jeugdploegen.',
        link: '/team/trainingen',
        color: 'btn-secondary',
        icon: RiCalendar2Line,
    },
    {
        name: 'Inschrijven',
        text: 'Alle informatie over hoe je lid wordt van SASJA.',
        link: '/club/inschrijven',
        color: 'btn-tertiary',
        icon: RiBallPenLine,
    },
]

export default function YouthPage() {
    return (
        <>
            <Head>
                <title>Sasja HC | Jeugd</title>
            </Head>
            <main>
                <h1 className="title1 mt-8">Jeugd</h1>
                <Container card={true} className="card-text">
                    <h2>Jeugdwerking bij Sasja</h2>
                    <p>
                        De jeugdwerking is een belangrijke pijler in het succes van Sasja. Heel wat
                        spelers uit onze 1ste ploeg, hebben bij Sasja hun opleiding gehad. Om dat te
                        bereiken moet er ook in de jeugd geïnvesteerd worden. En dat doet Sasja.
                        Omdat het loont. Omdat we vurig geloven in ons project. Maar investeren in
                        jeugdopleiding kost ook geld, tijd, geduld, heel veel energie en een
                        onvoorwaardelijke inzet van alle jeugdtrainers en begeleiders. We zijn hen
                        daar ontzettend dankbaar voor.
                    </p>
                    <p>
                        Voor onze jeugdwerking bestaat er al jaren een uniek samenwerkingsakkoord
                        met <a href="https://www.jespo.be">JESPO</a> vzw, die zorgt voor promotie,
                        maar tevens ook voor de nodige geschikte infrastructuur en aangepaste
                        trainingsmaterialen.
                    </p>
                </Container>
                <Container className="grid grid-cols-1 gap-8 laptop:grid-cols-3">
                    <h2 className="sr-only">Info</h2>
                    {info.map((info) => (
                        <section key={info.name} className="card flex flex-col p-8">
                            <h3 className="text-2xl">{info.name}</h3>
                            <p className="mt-4 flex-1 leading-relaxed text-dark">{info.text}</p>
                            <Link
                                href={info.link}
                                className={clsx(info.color, 'btn btn-text-icon mt-8')}
                            >
                                <span>Lees meer</span>
                                <RiArrowRightSLine />
                            </Link>
                        </section>
                    ))}
                </Container>
            </main>
        </>
    )
}

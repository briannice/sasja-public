import Container from '@/components/Container'
import Link from '@/components/Link'
import { db } from '@/services/firebase'
import { queryToModels } from '@/services/firebase/firestore'
import { TeamModel } from '@/types/models'
import clsx from 'clsx'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { GetStaticProps } from 'next'
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
    text: 'Bekijk het jeugdbeleidsplan van Sasja',
    link: '/club/inschrijven',
    color: 'btn-tertiary',
    icon: RiBallPenLine,
  },
]

type Props = {
  teams: TeamModel[]
}

export default function YouthPage({ teams }: Props) {
  return (
    <>
      <Head>
        <title>Sasja HC | Jeugd</title>
      </Head>
      <main>
        <h1 className="sr-only">Jeugd</h1>
        <Container card={true} className="card-text">
          <h2>Jeugdploegen</h2>
          <p>
            De jeugdwerking is een belangrijke pijler in het succes van Sasja. Op onze website kan u
            alles vinden over de kalenders, klassementen, trainingen en trainers van onze
            jeugdploegen.
          </p>
          <ul className="space-y-2">
            {teams.map((team) => (
              <li key={team.id}>
                <div className="flex items-center space-x-4">
                  <RiArrowRightSLine />
                  <Link href={`/team/${team.id}`}>{team.name}</Link>
                </div>
              </li>
            ))}
          </ul>
        </Container>
        <Container className="grid grid-cols-1 gap-8 laptop:grid-cols-3">
          <h2 className="sr-only">Info</h2>
          {info.map((info) => (
            <section key={info.name} className="card flex flex-col p-8">
              <h3 className="text-2xl">{info.name}</h3>
              <p className="mt-4 flex-1 leading-relaxed text-dark">{info.text}</p>
              <Link href={info.link} className={clsx(info.color, 'btn btn-text-icon mt-8')}>
                <span>Lees meer</span>
                <RiArrowRightSLine />
              </Link>
            </section>
          ))}
        </Container>
        <Container card={true} className="card-text">
          <h2>Jeugd handbal</h2>
          <p>
            Handbal is een heel complete en leuke sport voor kinderen die van balsporten houden en
            graag in teamverband spelen. Het spel gaat heel snel en er wordt veel gescoord; dus ook
            voor de toeschouwers is er genoeg te zien.
          </p>
          <p>
            Hou jij van lopen, springen en gooien, maar vooral van samen werken ? Kom dan een
            keertje meedoen op een van onze trainingen of stuur een berichtje naar{' '}
            <a href="mailto:jeugd@sasja-antwerpen.be">jeugd@sasja-antwerpen.be</a>. We vinden het
            altijd fijn als je – na een aantal trainingen – wil deelnemen aan wedstrijden. Maar als
            je liever alleen komt trainen, dan kan dat ook.
          </p>
        </Container>
        <Container card={true} className="card-text">
          <h2>Jeugdwerking bij Sasja</h2>
          <p>
            De jeugdwerking is een belangrijke pijler in het succes van Sasja. Heel wat spelers uit
            onze 1ste ploeg, hebben bij Sasja hun opleiding gehad. Om dat te bereiken moet er ook in
            de jeugd geïnvesteerd worden. En dat doet Sasja. Omdat het loont. Omdat we vurig geloven
            in ons project. Maar investeren in jeugdopleiding kost ook geld, tijd, geduld, heel veel
            energie en een onvoorwaardelijke inzet van alle jeugdtrainers en begeleiders. We zijn
            hen daar ontzettend dankbaar voor.
          </p>
          <p>
            Voor onze jeugdwerking bestaat er al jaren een uniek samenwerkingsakkoord met{' '}
            <a href="https://www.jespo.be">JESPO</a> vzw, die zorgt voor promotie, maar tevens ook
            voor de nodige geschikte infrastructuur en aangepaste trainingsmaterialen.
          </p>
        </Container>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const teams = await queryToModels<TeamModel>(
    query(collection(db, 'teams'), where('youth', '==', true), orderBy('name', 'desc'))
  )

  return {
    props: {
      teams,
    },
    revalidate: 5 * 60,
  }
}

import Container from '@/components/Container'
import Link from '@/components/Link'
import Head from 'next/head'
import React from 'react'
import {collectionToModels} from "@/services/firebase/firestore";
import {TeamModel} from "@/types/models";
import {collection, getDocs, query} from "firebase/firestore";
import {db} from "@/services/firebase";
import {GetStaticProps} from "next";
import {AiFillAndroid, AiFillApple} from "react-icons/ai";
import {GrPersonalComputer} from "react-icons/gr";

type Props = {
    teams: TeamModel[]
}
export default function CalendersPage({teams}: Props) {

    return (
        <>
            <Head>
                <title>Sasja HC | Kalenders</title>
            </Head>
            <main>
                <h1 className="title1 mt-8">Kalenders</h1>
                <Container card={true} className="card-text">
                    <p>
                        Alle kalenders en standen vind je op de team-pagina&apos;s onder <b>Kern</b> of <b>Jeugd</b>.
                    </p>
                    <p>
                        Wil je de wedstrijden toevoegen aan je persoonlijke kalender op je computer, telefoon of tablet, dan kan je dat doen met links op deze pagina.
                    </p>
                    <p>
                        Tot in de sporthal!
                    </p>
                </Container>

                <Container card={true}>
                    <div className="overflow-auto">
                    <table>
                      <thead>
                      <tr>
                        <th>
                          <p>Team</p>
                        </th>
                        <th>
                          <p>Google</p>
                        </th>
                        <th>
                          <p>Apple</p>
                        </th>
                      </tr>
                      </thead>
                        <tbody>
                        {teams.map((team) => (
                            <tr key={team.id}>
                                <td>{team.name}</td>
                                <td><Link className="flex align-middle" href={"https://calendar.google.com/calendar/render?cid="+team.calender} blank={true}><AiFillAndroid/><GrPersonalComputer/></Link></td>
                                <td><Link className="flex align-middle" href={"https://calendar.google.com/calendar/ical/"+team.calender+"/public/basic.ics"}><AiFillApple/></Link></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </Container>

            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
  const teams = collectionToModels<TeamModel>(await getDocs(query(collection(db, 'teams'))))
    return {
        props: {
            teams,
        },
        revalidate: 5 * 60,
    }
}
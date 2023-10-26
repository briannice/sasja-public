import Container from '@/components/Container'
import Link from '@/components/Link'
import Head from 'next/head'
import React, {useEffect, useRef, useState} from 'react'
import {collectionToModels} from "@/services/firebase/firestore";
import {TeamModel} from "@/types/models";
import {collection, getDocs, orderBy, query} from "firebase/firestore";
import {db} from "@/services/firebase";
import {GetStaticProps} from "next";
import {AiFillApple} from "react-icons/ai";
import {GrFormCheckmark} from "react-icons/gr";
import {HiClipboardDocumentList} from "react-icons/hi2";
import {HiExternalLink} from "react-icons/hi";
import {FcGoogle} from "react-icons/fc";
import {RiMicrosoftFill} from "react-icons/ri";

type Props = {
    teams: TeamModel[]
}
export default function CalendersPage({teams}: Props) {
    const appleCopiedRef = useRef(teams.map(() => false));
    const googleCopiedRef = useRef(teams.map(() => false));
    const [appleCopied, setAppleCopied] = useState(teams.map(() => false));
    const [googleCopied, setGoogleCopied] = useState(teams.map(() => false));

    const clickGoogle = (e: any, team: TeamModel, i: number) => {
        e.preventDefault();
        copylink(team.calender)
        const stateCopy = [...googleCopied]
        stateCopy[i] = true
        setGoogleCopied(stateCopy)
        const id = setTimeout(() => {
            const stateCopy = [...googleCopiedRef.current]
            stateCopy[i] = false
            setGoogleCopied(stateCopy)
        }, 1500);
        return () => clearTimeout(id)
    }
    const clickApple = (e: any, team: TeamModel, i: number) => {
        e.preventDefault();
        copylink("https://calendar.google.com/calendar/ical/" + team.calender + "/public/basic.ics")
        const stateCopy = [...appleCopied]
        stateCopy[i] = true
        setAppleCopied(stateCopy)
        const id = setTimeout(() => {
            const stateCopy = [...appleCopiedRef.current]
            stateCopy[i] = false
            setAppleCopied(stateCopy)
        }, 1500);
        return () => clearTimeout(id)
    }

    const copylink = (link: string) => {
        navigator.clipboard.writeText(link)
    }

    useEffect(() => {
        appleCopiedRef.current = appleCopied;
        googleCopiedRef.current = googleCopied;
    }, [appleCopied, googleCopied]);

    return (
        <>
            <Head>
                <title>Sasja HC | Kalenders</title>
            </Head>
            <main>
                <h1 className="title1 mt-8">Kalenders</h1>
                <Container card={true} className="card-text">
                    <p>
                        Alle uitslagen, kalenders en standen vind je op de team-pagina&apos;s onder <b>Kern</b> of <b>Jeugd</b>.
                    </p>
                    <p>
                        Wil je de wedstrijden toevoegen aan je persoonlijke kalender op je computer, telefoon of tablet,
                        dan kan je dat doen met links op deze pagina.
                    </p>
                    <p>
                        Als je niet goed weet hoe dat moet, lees dan zeker ook de instructies onderaan deze pagina!
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
                                    <p>Kalender</p>
                                </th>

                            </tr>
                            </thead>
                            <tbody>
                            {teams.map((team, i) => (
                                <tr key={team.id}>
                                    <td>
                                        <span className="font-kanit">{team.name}</span>
                                    </td>
                                    <td>
                                        <div className="flex">
                                            <Link className="flex m-2"
                                                  href={"https://calendar.google.com/calendar/render?cid=" + team.calender}
                                                  blank={true}>
                                                <FcGoogle color="#3DDC84"/><HiExternalLink/>
                                            </Link>
                                            <Link className="flex m-2" href="#" onClick={(e) => clickGoogle(e, team, i)}>
                                                <FcGoogle color="#3DDC84"/>{googleCopied[i] ? <GrFormCheckmark/> :
                                                <HiClipboardDocumentList/>}
                                            </Link>
                                            <Link className="flex m-2" href="#" onClick={(e) => clickApple(e, team, i)}>
                                                <AiFillApple color="#555555"/><RiMicrosoftFill
                                                color="#0072C6"/>{appleCopied[i] ? <GrFormCheckmark/> :
                                                <HiClipboardDocumentList/>}
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </Container>
                <Container card={true} className="card-text cms-content">
                    <h2>Instructies</h2>
                    <p>Om de kalenders te gebruiken, moet je eerst even kijken welk systeem je gebruikt om je agenda bij
                        te houden.</p>
                    <ul>
                        <li><a href="#google">Google Agenda</a><p className="text-sm">(Android telefoon of tablet,
                            Gmail, ...)</p></li>
                        <li><a href="#ical">iCal</a><p className="text-sm">(Apple iCloud, iPhone, iPad, macOS,
                            Microsoft Outlook, )</p></li>
                    </ul>
                    <h3 id="google">Gebruikers van Google Agenda (Calendar)</h3>
                    <h4 className="flex">Directe link (<FcGoogle
                        color="#3DDC84"/><HiExternalLink/>)<span><i>&nbsp;Aanbevolen Methode</i></span></h4>
                    <p>
                        Deze link gebruik je om meteen naar Google Agenda te gaan en je te abonneren op de agenda van de
                        ploeg.
                    </p>
                    <p>
                        Nadat je de vraag hebt gekregen om de kalender toe te voegen aan je eigen agenda,
                        kan je de kleur van de wedstrijden in je agenda selecteren, instellen of je wil verwittigd
                        worden of elke andere aanpassing maken die je gewend bent van Google Agenda.
                    </p>
                    <h4 className="flex">Code naar klembord kopiëren (<FcGoogle
                        color="#3DDC84"/><HiClipboardDocumentList/>)</h4>
                    <p>
                        Als de bovenstaande methode niet lukt, dan kan je a.d.h.v deze link de unieke identificatiecode
                        van de kalender naar je klembord kopiëren. De identificatiecode ziet er uit als een e-mailadres.
                        Je kan dit e-mailadres nu gebruiken om je abonnement op deze kalendar manueel toe te voegen in
                        Google Agenda.
                    </p>
                    <p>
                        Zie ook <a href="https://support.google.com/calendar/answer/37100?hl=nl" target="_blank"
                                   rel="noreferrer">deze link</a> van Google Help voor meer informatie.
                    </p>
                    <p className="text-sm">
                        Noot: In de instructies is <i>het e-mailadres van de persoon</i> gelijk aan <i>het e-mailadres
                        van de kalender op je klembord</i>.
                    </p>
                    <h3 id="ical">Abonneren op de agenda met iCal</h3>
                    <h4 className="flex">iCal link naar klembord kopiëren(<AiFillApple color="#555555"/><RiMicrosoftFill
                        color="#0072C6"/><HiClipboardDocumentList/>)</h4>
                    <p>
                        Als je geen Google Agenda gebruikt, is de kans groot dat je programma ondersteuning biedt om je
                        te abonneren op een iCal-compatibele kalender.
                    </p>
                    <p>
                        Hieronder vind je een aantal links naar pagina&apos;s die je uitleggen hoe je dat moet doen met
                        de url die je naar je klembord hebt gekopiëerd uit de tabel hierboven:
                    </p>
                    <ul>
                        <li>
                            <a href="https://support.apple.com/nl-be/102301" target="_blank" rel="noreferrer">iCloud</a>
                            <p className="text-sm">(iPhone, iPad, MacBook, ...)</p>
                        </li>
                        <li>
                            <a href="https://support.microsoft.com/nl-nl/office/agenda-s-in-outlook-importeren-8e8364e1-400e-4c0f-a573-fe76b5a2d379"
                               target="_blank" rel="noreferrer">MS Outlook</a>
                            <p className="text-sm">(kies <i>Internetagenda&apos;s toevoegen</i>)</p>
                        </li>
                        <li>
                            <a href="https://support.microsoft.com/nl-nl/office/een-agenda-importeren-of-u-abonneren-op-een-agenda-in-outlook-com-cff1429c-5af6-41ec-a5b4-74f2c278e98c"
                               target="_blank" rel="noreferrer">Outlook.com</a>
                            <p className="text-sm">(kies <i>Abonneren op agenda</i>)</p>
                        </li>
                    </ul>
                    <p className="text-sm">
                        Noot: In instructies om een iCal-compatibele kalender te gebruiken vind je meestal 2 opties:
                        importeren of abonneren. Kies altijd voor abonneren: zo blijf je op de hoogte van wijzigingen.
                        Als je enkel importeert, dan krijg je geen aanpassingen doorgestuurd en zit je misschien snel
                        met verouderde gegevens.
                    </p>
                </Container>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const teams = collectionToModels<TeamModel>(await getDocs(query(collection(db, 'teams'), orderBy("sortOrder"))))
    return {
        props: {
            teams,
        },
        revalidate: 5 * 60,
    }
}
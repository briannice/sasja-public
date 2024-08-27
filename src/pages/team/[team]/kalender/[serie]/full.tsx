import ClubLogo from '@/components/teams/ClubLogo'
import { db } from '@/services/firebase'
import { docRefToModel, queryToModels } from '@/services/firebase/firestore'
import { competitionService } from '@/services/competitions/competition'
import { GameDay, GameModel, TeamModel } from '@/types/models'
import { formatDate, getMonthFromDate, getWeekDayFromDate } from '@/utils/date'
import { collection, doc, query } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import Popup from '@/components/Popup'
import GameDetail from '@/components/teams/GameDetail'

type Props = {
    name: string
    gameDays: GameDay[]
}

export default function FullCalendarPage({ name, gameDays }: Props) {
    const createDate = (date: string) => {
        const weekday = getWeekDayFromDate(date)
        const day = formatDate(date, 'D')
        const month = getMonthFromDate(date)
        return `${weekday} ${day} ${month}`
    }

    return (
        <>
            <Head>
                <title>{`Sasja HC | ${name}`}</title>
            </Head>
            <main className="container space-y-8">
                <h1 className="sr-only">Alle wedstrijden</h1>
                <h2 className="title1">{name}</h2>
                {gameDays.map((gameDay) => (
                    <section key={gameDay.date}>
                        <h2 className="title2">{createDate(gameDay.date)}</h2>
                        <div className="card mt-8 divide-y divide-light">
                            {gameDay.games.map((game) => (
                                <Game key={game.id} game={game} />
                            ))}
                        </div>
                    </section>
                ))}
            </main>
        </>
    )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    const teams = await queryToModels<TeamModel>(query(collection(db, 'teams')))
    const paths: any = []
    teams.forEach((team) => {
        const id = team.id
        team.competitions.forEach((competition) => {
            const path = {
                params: {
                    team: id,
                    serie: competition.name.toLocaleLowerCase().replaceAll(/\ /g, '-'),
                },
            }
            paths.push(path)
        })
    })
    return {
        paths: paths,
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (!params) return { notFound: true }

    const teamId = params.team as string
    const team = await docRefToModel<TeamModel>(doc(db, 'teams', teamId))

    const serieName = params.serie as string
    const competition = team.competitions.find(
        (c) => c.name.toLocaleLowerCase().replaceAll(/\ /g, '-') === serieName
    )

    if (!competition) return { notFound: true }

    const gameDays = await competitionService.getCompetitionCalendarFull(competition)

    return {
        props: {
            name: competition.name,
            gameDays: gameDays,
        },
        revalidate: 5 * 60,
    }
}

function Game({ game }: { game: GameModel }) {
    const [showInfo, setShowInfo] = useState(false)

    const createTime = (time: string | null) => {
        if (!time) return ''

        const hours = time.split(':')[0]
        const minutes = time.split(':')[1]
        return `${hours}:${minutes}`
    }

    return (
        <div className="card-click p-4" onClick={() => setShowInfo(true)}>
            <div className="flex items-center justify-center">
                <div className="hidden flex-1 pr-4 tablet:block">
                    <p className="text-right text-sm text-dark">{createTime(game.time)}</p>
                </div>
                <div className="flex flex-1 flex-col-reverse items-end tablet:flex-row tablet:items-center tablet:justify-end tablet:space-x-4">
                    <p className="mt-2 text-right font-kanit tablet:mt-0">{game.home_short}</p>
                    <ClubLogo path={game.home_logo} size={20} />
                </div>
                <div className="flex items-center justify-center space-x-2 font-kanit'">
                    <p className="w-6 text-right">
                        {game.score_status_id === 0 ? '' : game.home_score}
                    </p>
                    <p>{game.score_status_id === 0 ? '' : '-'}</p>
                    <p className="w-6">{game.score_status_id === 0 ? '' : game.away_score}</p>
                </div>
                <div className="flex flex-1 flex-col tablet:flex-row tablet:items-center tablet:space-x-4">
                    <ClubLogo path={game.away_logo} size={20} />
                    <p className="mt-2 font-kanit tablet:mt-0">{game.away_short}</p>
                </div>
                <div className="hidden flex-1 pl-4 tablet:block">
                    <p className="text-sm text-dark">{game.venue_name}</p>
                </div>
            </div>
            <Popup open={showInfo} onClose={setShowInfo}>
                <GameDetail game={game} />
            </Popup>
        </div>
    )
}

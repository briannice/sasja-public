import CalendarTable from '@/components/teams/CalendarTable'
import { db } from '@/services/firebase'
import { docRefToModel, queryToModels } from '@/services/firebase/firestore'
import { GameModel, TeamCompetition, TeamModel } from '@/types/models'
import { collection, doc, query } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import { competitionService } from '@/services/competitions/competition'
import * as XLSX from 'xlsx'
import useAuthentication from '@/utils/auth'

type Props = {
  name: string
  competition: TeamCompetition
  calendar: GameModel[]
}

export default function CalendarPage({ name, competition, calendar }: Props) {
  const [downloading, setDownloading] = React.useState(false)
  const {isAuthenticated} = useAuthentication()

  const downloadExcel = React.useCallback(async () => {
    setDownloading(true)

    try {
      const authenticated = isAuthenticated()
      const downloadCalendar = authenticated ? await competitionService.getCompetitionCalendar(competition, authenticated): calendar
      const rows = downloadCalendar.map((g) => ({
        Date: g.date,
        Time: g.time ?? '',
        Number: g.game_number,
        Code: g.match_code,
        Pin: g.home_team_pin == '' ? g.away_team_pin : g.home_team_pin,
        Home: g.home_name ?? g.home_short,
        Away: g.away_name ?? g.away_short,
        Venue: g.venue_name,
        City: g.venue_city,
        Score:
          g.game_status_id === 2 ? `${g.home_score} - ${g.away_score}` : '',
      }))

      const ws = XLSX.utils.json_to_sheet(rows)
      const wb = XLSX.utils.book_new()
      const sanitize = (s: string) => s.replace(/[^\w\-]+/g, '_')
      XLSX.utils.book_append_sheet(wb, ws, sanitize(name))

      const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const fileName = `${sanitize(name)}_kalender.xlsx`

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Failed to export calendar as Excel', err)
    } finally {
      setDownloading(false)
    }
  }, [calendar, competition, name, isAuthenticated])

  return (
    <>
      <Head>
        <title>{`Sasja HC | ${name}`}</title>
      </Head>
      <main>
        <h1 className="sr-only">Wedstrijden | {name}</h1>
        <section className="container space-y-8 py-16">
          <h2 className="title1">{name}</h2>
          <CalendarTable calendar={calendar} />
          <button
            type="button"
            onClick={downloadExcel}
            disabled={downloading}
            className="btn btn-primary btn-text-icon tablet:text-sm">
            {downloading ? 'Bezig met downloaden…' : 'Download kalender'}
          </button>
        </section>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
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

  const calendar = await competitionService.getCompetitionCalendar(competition, false)

  return {
    props: {
      name: competition.name,
      competition: competition,
      calendar: calendar,
    },
    revalidate: 5 * 60,
  }
}

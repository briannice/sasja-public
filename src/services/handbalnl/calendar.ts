import { GameModel, TeamCompetition } from '@/types/models'
import { getDateRangeForGamesOverview } from '@/utils/date'
import { HANDBALNL_BASED_COMPETITIONS } from '@/services/handbalnl/competitions'
import * as xlsx from 'xlsx'
import { fromIsoDate, handbalNlService, teamService, toIsoDate, venueService } from '@/services/handbalnl/index'

export const getHandbalNlCalendarFull = async (competition: TeamCompetition, fromDate = '', toDate = '') => {


  const data = await handbalNlService.retrieveData('programma', fromDate, toDate)

  if (data.byteLength === 0) return []


  const workbook = xlsx.read(data)

  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]
  const handbalNlCalendar: HandbalNlCalendar[] = xlsx.utils.sheet_to_json(worksheet)
  const games: GameModel[] = []
  handbalNlCalendar.forEach((gameRow) => {
    games.push({
      id: 0,
      date: toIsoDate(gameRow.Datum),
      time: gameRow.Tijd,
      venue_id: 0,
      home_id: 0,
      away_id: 0,
      home_score: 0,
      away_score: 0,
      game_status_id: 0,
      score_status_id: 0,
      home_name: teamService.getName(gameRow['Thuis team']),
      home_short: teamService.getShortName(gameRow['Thuis team']),
      away_name: teamService.getName(gameRow['Uit team']),
      away_short: teamService.getShortName(gameRow['Uit team']),
      home_logo: teamService.getLogo(gameRow['Thuis team']),
      away_logo: teamService.getLogo(gameRow['Uit team']),
      venue_name: venueService.getName(gameRow.Accommodatie),
      venue_short: venueService.getShortName(gameRow.Accommodatie),
      venue_city: venueService.getCity(gameRow.Accommodatie),
      game_number: '', // gameRow.Wedstrijdnr,
      serie_id: competition.serieId,
      serie_name: competition.name,
      serie_short: competition.name,
      referees: [],
      has_detail: true,
      home_team_pin: '',
      away_team_pin: '',
      match_code: '',
      venue_street: venueService.getStreet(gameRow.Accommodatie),
      venue_zip: venueService.getZip(gameRow.Accommodatie),
    })
  })

  return games
}

export const getHandbalNlCalendar = async (competition: TeamCompetition, fromDate = '', toDate = '') => {
  return getHandbalNlCalendarFull(competition, fromDate, toDate)
    .then((games) =>
      games.filter((game) => {
        return isSasjaGame(game.home_name, game.away_name)
      }),
    )
}

export const getFutureHandbalNlGames = async () => {
  const [start_date] = getDateRangeForGamesOverview(0)
  return Promise.all(
    HANDBALNL_BASED_COMPETITIONS.map((competition) =>
      getHandbalNlCalendar(competition, fromIsoDate(start_date))),
  ).then((games) =>
    games.flat(),
  ).then((games) =>
    games.filter((game) => {
      return isSasjaGame(game.home_name, game.away_name)
    }),
  ).then((games) =>
    games.filter((game) => {
      return new Date(game.date).getTime() >= new Date(start_date).getTime()
    }),
  )
}

function isSasjaGame(home: string, away: string): boolean {
  return [home, away].some((name) => name && name.toLowerCase().includes('sasja'))
}

type HandbalNlCalendar = {
  Datum: string,
  Tijd: string,
  'Thuis team': string,
  'Uit team': string,
  Wedstrijdnr: string,
  Poule: string,
  Accommodatie: string,
  Veld: string,
  Uitslagen: string,
}
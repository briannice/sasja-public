import { GameModel, RankModel, TeamCompetition } from '@/types/models'
import { CompetitionIntegration } from '@/services/competitions/competition'
import {
  handbalNlService,
  teamService,
  toIsoDate,
  venueService,
} from '@/services/competitions/handbalnl/index'
import * as xlsx from 'xlsx'
import { getDateRangeForGamesOverview } from '@/utils/date'
import { HANDBALNL_BASED_COMPETITIONS } from '@/services/competitions/handbalnl/competitions'

export class HandbalNlCompetitionIntegration implements CompetitionIntegration {

  public async getCompetitionCalendar(competition: TeamCompetition): Promise<GameModel[]> {
    return this.getCompetitionCalendarFull(competition)
      .then((games) =>
        games.filter((game) => {
          return this.isSasjaGame(game.home_name, game.away_name)
        }),
      )
  }

  public async getCompetitionCalendarFull(competition: TeamCompetition): Promise<GameModel[]> {
    const data = await handbalNlService.retrieveData('programma')

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

  public async getFutureGames(): Promise<GameModel[]> {
    const [start_date] = getDateRangeForGamesOverview(0)
    const games = await Promise.all(
      HANDBALNL_BASED_COMPETITIONS.map((competition) =>
        this.getCompetitionCalendar(competition)),
    )
    return games
      .flat()
      .filter((game) => {
          return this.isSasjaGame(game.home_name, game.away_name)
        },
      )
      .filter((game) => {
          return new Date(game.date).getTime() >= new Date(start_date).getTime()
        },
      )
  }

  private isSasjaGame(home: string, away: string): boolean {
    return [home, away].some((name) => name && name.toLowerCase().includes('sasja'))
  }

  public async getGameWeeks(weeks: number): Promise<GameModel[]> {
    const [start_date, end_date] = getDateRangeForGamesOverview(weeks)
    const games = await Promise.all(
      HANDBALNL_BASED_COMPETITIONS.map((competition) =>
        this.getCompetitionCalendar(competition)),
    )
    return games
      .flat()
      .filter((game) => {
          const gameDate = new Date(game.date).getTime()
          return gameDate >= new Date(start_date).getTime() && gameDate <= new Date(end_date).getTime()
        },
      )
  }

  public async getCompetitionRanking(): Promise<RankModel[]> {
    const ranking: RankModel[] = []

    const data = await handbalNlService.retrieveData('standen')

    if (data.byteLength === 0) return []

    const workbook = xlsx.read(data)
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const handNlRanking: HandbalNlRanking[] = xlsx.utils.sheet_to_json(worksheet)
    handNlRanking.forEach((rankingRow) => {
      ranking.push({
        id: 0,
        name: teamService.getName(rankingRow.Team),
        short: teamService.getShortName(rankingRow.Team),
        logo: teamService.getLogo(rankingRow.Team),
        played: rankingRow.Gespeeld,
        wins: rankingRow.Winst,
        losses: rankingRow.Verlies,
        draws: rankingRow.Gelijk,
        scored: rankingRow.Voor,
        conceded: rankingRow.Tegen,
        difference: rankingRow.Verschil,
        points: rankingRow.Punten,
        results: [],
        position: rankingRow['#'],
      })
    })

    return ranking
  }

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

type HandbalNlRanking = {
  Team: string,
  Gespeeld: number,
  Winst: number,
  Verlies: number,
  Gelijk: number,
  Voor: number,
  Tegen: number,
  Verschil: number,
  Punten: number,
  '#': number
}
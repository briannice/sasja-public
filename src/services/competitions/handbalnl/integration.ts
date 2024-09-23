import { GameModel, RankModel, TeamCompetition } from '@/types/models'
import { AbstractCompetitionIntegration } from '@/services/competitions/abstract/integration'
import {
  handbalNlService,
  lookupTeam,
  toIsoDate,
} from '@/services/competitions/handbalnl/index'
import * as xlsx from 'xlsx'
import { HANDBALNL_BASED_COMPETITIONS } from '@/services/competitions/competition'
import path from 'path'
import { TeamService } from '@/services/teams'
import { VenueService } from '@/services/venues'

export class HandbalNlCompetitionIntegration extends AbstractCompetitionIntegration {

  private teamService = new TeamService(path.join(process.cwd(), 'static/handbalnl/teams.yaml'))
  private venueService = new VenueService(path.join(process.cwd(), 'static/handbalnl/venues.yaml'))

  public async getCompetitionCalendarFull(competition: TeamCompetition): Promise<GameModel[]> {
    const games = await Promise.all([
      this.getCompetitionCalendarPart(competition, 'uitslagen'),
      this.getCompetitionCalendarPart(competition, 'programma'),
    ])
    return [
      ...games[0], // played games
      ...games[1] // future games, filtering out games that are already in played games
        .filter(futureGame =>
          !games[0].some(playedGame => playedGame.game_number === futureGame.game_number),
        ),
    ].sort((game1, game2) =>
      game1.date.localeCompare(game2.date) !== 0 ?
        game1.date.localeCompare(game2.date) :
        (game1.time && game2.time ?
          game1.time.localeCompare(game2.time) :
          0),
    )
  }

  private async getCompetitionCalendarPart(competition: TeamCompetition, tab: string): Promise<GameModel[]> {
    const data = await handbalNlService.retrieveData(tab)

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
        home_score: (gameRow.Uitslagen ?? '').includes('-') ? parseInt(gameRow.Uitslagen.split('-')[0]) : 0,
        away_score: (gameRow.Uitslagen ?? '').includes('-') ? parseInt(gameRow.Uitslagen.split('-')[1]) : 0,
        game_status_id: (gameRow.Uitslagen ?? '').includes('-') ? 2 : 0,
        score_status_id: (gameRow.Uitslagen ?? '').includes('-') ? 1 : 0,
        home_name: this.teamService.getName(lookupTeam(gameRow['Thuis team'])),
        home_short: this.teamService.getShortName(lookupTeam(gameRow['Thuis team'])),
        away_name: this.teamService.getName(lookupTeam(gameRow['Uit team'])),
        away_short: this.teamService.getShortName(lookupTeam(gameRow['Uit team'])),
        home_logo: this.teamService.getLogo(lookupTeam(gameRow['Thuis team'])),
        away_logo: this.teamService.getLogo(lookupTeam(gameRow['Uit team'])),
        venue_name: this.venueService.getName((gameRow.Accommodatie ?? '').trim()),
        venue_short: this.venueService.getShortName((gameRow.Accommodatie ?? '').trim()),
        venue_city: this.venueService.getCity((gameRow.Accommodatie ?? '').trim()),
        game_number: gameRow.Wedstrijdnr,
        serie_id: competition.serieId,
        serie_name: competition.name,
        serie_short: competition.name,
        referees: [],
        has_detail: true,
        home_team_pin: '',
        away_team_pin: '',
        match_code: '',
        venue_street: this.venueService.getStreet((gameRow.Accommodatie ?? '').trim()),
        venue_zip: this.venueService.getZip((gameRow.Accommodatie ?? '').trim()),
      })
    })

    return games

  }

  public getAllCompetitions(): TeamCompetition[] {
    return HANDBALNL_BASED_COMPETITIONS
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
        name: this.teamService.getName(lookupTeam(rankingRow.Team)),
        short: this.teamService.getShortName(lookupTeam(rankingRow.Team)),
        logo: this.teamService.getLogo(lookupTeam(rankingRow.Team)),
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
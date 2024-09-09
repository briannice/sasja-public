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
        home_name: this.teamService.getName(lookupTeam(gameRow['Thuis team'])),
        home_short: this.teamService.getShortName(lookupTeam(gameRow['Thuis team'])),
        away_name: this.teamService.getName(lookupTeam(gameRow['Uit team'])),
        away_short: this.teamService.getShortName(lookupTeam(gameRow['Uit team'])),
        home_logo: this.teamService.getLogo(lookupTeam(gameRow['Thuis team'])),
        away_logo: this.teamService.getLogo(lookupTeam(gameRow['Uit team'])),
        venue_name: this.venueService.getName(gameRow.Accommodatie),
        venue_short: this.venueService.getShortName(gameRow.Accommodatie),
        venue_city: this.venueService.getCity(gameRow.Accommodatie),
        game_number: '', // gameRow.Wedstrijdnr,
        serie_id: competition.serieId,
        serie_name: competition.name,
        serie_short: competition.name,
        referees: [],
        has_detail: true,
        home_team_pin: '',
        away_team_pin: '',
        match_code: '',
        venue_street: this.venueService.getStreet(gameRow.Accommodatie),
        venue_zip: this.venueService.getZip(gameRow.Accommodatie),
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
import { AbstractCompetitionIntegration } from '@/services/competitions/abstract/integration'
import { GameModel, RankModel, TeamCompetition } from '@/types/models'
import { SHL_BASED_COMPETITIONS } from '@/services/competitions/competition'
import { lookupTeam, shlApi } from '@/services/competitions/shl/index'
import path from 'path'
import { TeamService } from '@/services/teams'
import { VenueService } from '@/services/venues'

export class SuperHandballLeageCompetitionIntegration extends AbstractCompetitionIntegration {

  private teamService = new TeamService(path.join(process.cwd(), 'static/shl/teams.yaml'))
  private venueService = new VenueService(path.join(process.cwd(), 'static/shl/venues.yaml'))

  public async getCompetitionCalendarFull(competition: TeamCompetition): Promise<GameModel[]> {
    const { data, status } = await shlApi.get(`general/api/sportsuite/match-program/ALL/37674`)

    if (status !== 200) return []

    return data.map((e: any) => ({
      id: 0,
      date: this.toIsoDate(e.date),
      time: e.match_time,
      venue_id: 0,
      home_id: e.home_team_id,
      away_id: e.away_team_id,
      home_score: 0,
      away_score: 0,
      game_status_id: 0,
      score_status_id: 0,
      home_name: this.teamService.getName(lookupTeam(e.home_team)),
      home_short: this.teamService.getShortName(lookupTeam(e.home_team)),
      away_name: this.teamService.getName(lookupTeam(e.away_team)),
      away_short: this.teamService.getShortName(lookupTeam(e.away_team)),
      home_logo: this.teamService.getLogo(lookupTeam(e.home_team)),
      away_logo: this.teamService.getLogo(lookupTeam(e.away_team)),
      venue_name: this.venueService.getName(this.teamService.getVenue(lookupTeam(e.home_team))),
      venue_short: this.venueService.getShortName(this.teamService.getVenue(lookupTeam(e.home_team))),
      venue_city: this.venueService.getCity(this.teamService.getVenue(lookupTeam(e.home_team))),
      game_number: e.external_match_id,
      serie_id: competition.serieId,
      serie_name: competition.name,
      serie_short: competition.name,
      referees: [],
      has_detail: true,
      home_team_pin: '',
      away_team_pin: '',
      match_code: '',
      venue_street: this.venueService.getStreet(this.teamService.getVenue(lookupTeam(e.home_team))),
      venue_zip: this.venueService.getZip(this.teamService.getVenue(lookupTeam(e.home_team))),
    })) as GameModel[]
  }

  public async getCompetitionRanking(competition: TeamCompetition): Promise<RankModel[]> {
    const { data, status } = await shlApi.get(`/general/api/sportsuite/pool-standing/37674`)

    competition.name

    if (status !== 200) return []

    return data.map((e: any) => ({
      id: '',
      name: this.teamService.getName(e.name),
      short: this.teamService.getShortName(e.name),
      logo: this.teamService.getLogo(e.name),
      played: e.games,
      wins: e.wins,
      losses: e.losses,
      draws: e.draws,
      // scored: e.score_for,
      // conceded: e.score_against,
      // difference: e.score_for - e.score_against,
      points: e.points,
      results: [],
      position: e.position,
    })) as RankModel[]
  }

  public getAllCompetitions(): TeamCompetition[] {
    return SHL_BASED_COMPETITIONS
  }


  private toIsoDate(dateString: string): string {

    if (dateString) {
      const months: MonthMapping = {
        'januari': 1,
        'februari': 2,
        'maart': 3,
        'april': 4,
        'mei': 5,
        'juni': 6,
        'juli': 7,
        'augustus': 8,
        'september': 9,
        'oktober': 10,
        'november': 11,
        'december': 12,
      }

      const [, date, monthName] = dateString.split(' ')
      const month = months[monthName.toLowerCase()]

      return `${month < 7 ? 2025 : 2024}-${month}-${date}`
    }
    return ''
  }
}

interface MonthMapping {
  [key: string]: number;
}
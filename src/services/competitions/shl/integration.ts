import { AbstractCompetitionIntegration } from '@/services/competitions/abstract/integration'
import { GameModel, RankModel, TeamCompetition } from '@/types/models'
import { SHL_BASED_COMPETITIONS } from '@/services/competitions/competition'
import { shlApi } from '@/services/competitions/shl/index'
import { teamService } from '@/services/competitions/handbalnl'

export class SuperHandballLeageCompetitionIntegration extends AbstractCompetitionIntegration {

  public async getCompetitionCalendarFull(competition: TeamCompetition): Promise<GameModel[]> {
    const { data, status } = await shlApi.get(`general/api/sportsuite/match-program/ALL/37674`,)

    if (status !== 200) return []

    return data.map((e: any) => ({
      id: '',
      date: this.toIsoDate(e.date),
      time: '', // TODO asjemenou
      venue_id: 0,
      home_id: 0,
      away_id: 0,
      home_score: 0,
      away_score: 0,
      game_status_id: 0,
      score_status_id: 0,
      home_name: teamService.getName(e.home_team),
      home_short: teamService.getShortName(e.home_team),
      away_name: teamService.getName(e.away_team),
      away_short: teamService.getShortName(e.away_team),
      home_logo: teamService.getLogo(e.home_team),
      away_logo: teamService.getLogo(e.away_team),
      venue_name: '', // TODO venueService.getName(teamService.getVenue(e.home_team)),
      venue_short: '', // TODO venueService.getShortName(teamService.getVenue(e.home_team)),
      venue_city: '', // TODO venueService.getCity(teamService.getVenue(e.home_team)),
      game_number: '', // TODO gameRow.Wedstrijdnr,
      serie_id: competition.serieId,
      serie_name: competition.name,
      serie_short: competition.name,
      referees: [],
      has_detail: true,
      home_team_pin: '',
      away_team_pin: '',
      match_code: '',
      venue_street: '??', // TODO venueService.getStreet(teamService.getVenue(e.home_team)),
      venue_zip: '??', // TODO venueService.getZip(teamService.getVenue(e.home_team)),
    })) as GameModel[]
  }

  public async getCompetitionRanking(competition: TeamCompetition): Promise<RankModel[]> {
    const { data, status } = await shlApi.get(`/general/api/sportsuite/pool-standing/37674`,)

    competition.name

    if (status !== 200) return []

    return data.map((e: any) => ({
      id: '',
      name: teamService.getName(e.name),
      short: teamService.getShortName(e.name),
      logo: teamService.getLogo(e.name),
      played: e.games,
      wins: e.wins,
      losses: e.losses,
      draws: e.draws,
      scored: 0, //e.score_for,
      conceded: 0, //e.score_against,
      difference: 0, //e.score_for - e.score_against,
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
      const months:MonthMapping = {
        'januari': 1,
        'februari': 2,
        'maart': 3,
        'april': 4,
        'mei': 5,
        'juni': 6,
        'juli': 7,
        'augustus':8,
        'september': 9,
        'oktober': 10,
        'november': 11,
        'december': 12
      };

      const [, date, monthName] = dateString.split(' ');
      const month = months[monthName.toLowerCase()];

      return `${month<7?2025:2024}-${month}-${date}`
    }
    return ''
  }
}

interface MonthMapping {
  [key: string]: number;
}
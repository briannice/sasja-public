import { GameModel, RankModel, TeamCompetition } from '@/types/models'
import { getDateRangeForGamesOverview } from '@/utils/date'
import { HandballBelgiumApi, SecureHandballBelgiumAPI } from '@/services/competitions/hb/index'
import { cleanGameNumber } from '@/utils/game'
import { GamedetailIntegration } from '@/services/competitions/gamedetail'
import { CompetitionIntegration } from '@/services/competitions/competition'

export class HBCompetitionIntegration implements CompetitionIntegration, GamedetailIntegration {

  public async getCompetitionCalendar(competition: TeamCompetition): Promise<GameModel[]> {
    const { data, status } = await HandballBelgiumApi(
      `ng/game/byMyLeague?serie_id=${competition.serieId}&club_id=24&with_referees=true&without_in_preparation=true&sort=game_date_time`,
    )

    if (status !== 200) return []
    return this.toGameModelArray(data)
  }

  public async getCompetitionCalendarFull(competition: TeamCompetition): Promise<GameModel[]> {
    const { data, status } = await HandballBelgiumApi(
      `ng/game/byMyLeague?serie_id=${competition.serieId}&with_referees=true&without_in_preparation=true&sort=game_date_time`,
    )
    if (status !== 200) return []
    return this.toGameModelArray(data)
  }

  public async getFutureGames(): Promise<GameModel[]> {
    const [start_date] = getDateRangeForGamesOverview(0)

    const { data, status } = await HandballBelgiumApi.get(
      `ng/game/byMyLeague?with_referees=true&no_forfeit=true&without_in_preparation=true&sort%5B0%5D=date&sort%5B1%5D=time&club_id=24&start_date=${start_date}`,
    )

    if (status !== 200) return []
    return this.toGameModelArray(data)
  }

  public async getGameWeeks(weeks: number): Promise<GameModel[]> {
    const [start_date, end_date] = getDateRangeForGamesOverview(weeks)

    const { data, status } = await HandballBelgiumApi.get(
      `ng/game/byMyLeague?with_referees=true&no_forfeit=true&without_in_preparation=true&sort%5B0%5D=date&sort%5B1%5D=time&club_id=24&start_date=${start_date}&end_date=${end_date}`,
    )

    if (status !== 200) return []
    return this.toGameModelArray(data)
  }

  public async getCompetitionRanking(competition: TeamCompetition): Promise<RankModel[]> {
    const { data, status } = await HandballBelgiumApi.get(
      `ng/ranking?serie_id=${competition.serieId}&sort=position`,
    )

    if (status !== 200) return []

    const ranking: RankModel[] = data.elements.map((e: any) => ({
      id: e.id,
      name: e.team_name,
      short: e.team_short_name,
      logo: e.club_logo_img_url,
      played: e.played,
      wins: e.wins,
      losses: e.losses,
      draws: e.draws,
      scored: e.score_for,
      conceded: e.score_against,
      difference: e.score_for - e.score_against,
      points: e.points,
      results: e.result_sequence.replaceAll(/\"|\[|\]/g, '').split(','),
      position: e.position,
    }))

    return ranking
  }

  public async getGameDetail(game: GameModel, isAuthenticated: boolean): Promise<GameModel> {
    const referees = game.referees
    const hbApi = isAuthenticated ? SecureHandballBelgiumAPI : HandballBelgiumApi
    const { data, status } = await hbApi.get(
      `ng/game/${game.id}`,
    )
    if (status !== 200) return game

    return {
      id: data.data.id,
      date: data.data.date,
      time: data.data.time || null,
      venue_id: data.data.venue_id || null,
      home_score: data.data.home_score || 0,
      away_score: data.data.away_score || 0,
      home_id: data.data.home_team_id || 0,
      away_id: data.data.away_team_id || 0,
      game_status_id: data.data.game_status_id,
      score_status_id: data.data.score_status_id,
      home_name: data.data.home_team_name || '',
      home_short: data.data.home_team_short_name || '',
      away_name: data.data.away_team_name || '',
      away_short: data.data.away_team_short_name || '',
      home_logo: data.data.home_club_logo_img_url || null,
      away_logo: data.data.away_club_logo_img_url || null,
      venue_name: data.data.venue_name || '',
      venue_short: data.data.venue_short_name || '',
      venue_city: data.data.venue_city || '',
      game_number: data.data.reference,
      serie_id: data.data.serie_id,
      serie_name: data.data.serie_name,
      serie_short: data.data.serie_short_name,
      referees: referees,
      has_detail: true,
      home_team_pin: (data.data.home_team_pin == '-' ? '\u20E0' : data.data.home_team_pin) || '\u20E0',
      away_team_pin: (data.data.away_team_pin == '-' ? '\u20E0' : data.data.away_team_pin) || '\u20E0',
      match_code: data.data.code || '\u20E0',
      venue_street: data.data.venue_street,
      venue_zip: data.data.venue_zip,
    }
  }

  private toGameModelArray(data: any): GameModel[] {
    return data.elements.map((e: any) => ({
      id: e.id,
      date: e.date,
      time: e.time || null,
      venue_id: e.venue_id || null,
      home_score: e.home_score || 0,
      away_score: e.away_score || 0,
      home_id: e.home_team_id || 0,
      away_id: e.away_team_id || 0,
      game_status_id: e.game_status_id,
      score_status_id: e.score_status_id,
      home_name: e.home_team_name || '',
      home_short: e.home_team_short_name || '',
      away_name: e.away_team_name || '',
      away_short: e.away_team_short_name || '',
      home_logo: e.home_club_logo_img_url || null,
      away_logo: e.away_club_logo_img_url || null,
      venue_name: e.venue_name || '',
      venue_short: e.venue_short_name || '',
      venue_city: e.venue_city || '',
      game_number: cleanGameNumber(e.reference),
      serie_id: e.serie_id,
      serie_name: e.serie_name,
      serie_short: e.serie_short_name,
      referees: e.referees.filter((r: any) => r).map((r: any) => ({
        firstname: r.firstname || '',
        surname: r.surname || '',
      })),
    }))
  }
}
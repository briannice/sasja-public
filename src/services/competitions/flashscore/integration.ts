import { AbstractCompetitionIntegration } from '@/services/competitions/abstract/integration'
import { GameModel, RankModel, TeamCompetition } from '@/types/models'
import { FLASHSCORE_BASED_COMPETITIONS } from '@/services/competitions/competition'
import { TeamService } from '@/services/teams'
import path from 'path'
import { VenueService } from '@/services/venues'
import { FlashScoreGame, FlashScoreService, lookupTeam, teamMapping } from '@/services/competitions/flashscore/index'

export function getDateAndTime(dateString: string | null | undefined) {
  if (!dateString) return { formattedDate: '', formattedTime: '' }
  const [datePart, timePart] = dateString.split(' ')
  const [day, month] = datePart.split('.').map(Number)
  const year = month >= 9 ? 2024 : 2025
  const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  return {
    formattedDate,
    formattedTime: timePart,
  }
}

export class FlashScoreIntegration extends AbstractCompetitionIntegration {
  private teamService = new TeamService(path.join(process.cwd(), 'static/flashscore/teams.yaml'))
  private venueService = new VenueService(path.join(process.cwd(), 'static/flashscore/venues.yaml'))
  private flashScoreService = new FlashScoreService()

  public async getCompetitionCalendarFull(competition: TeamCompetition): Promise<GameModel[]> {
    const games = await Promise.all([
      this.getCompetitionCalendarPart(competition, 'results'),
      this.getCompetitionCalendarPart(competition, 'fixtures'),
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

  public async getCompetitionCalendarPart(competition: TeamCompetition, page: string): Promise<GameModel[]> {
    const games = await this.flashScoreService.getGames(competition, page)
    if (games.length === 0) return []
    return games.map(game => {
      const dateTime = getDateAndTime(game.dateTime)
      const homeTeam = game.homeTeam
      const awayTeam = game.awayTeam
      const homeScore = game.homeScore
      const awayScore = game.awayScore
      return {
        id: 0,
        date: dateTime.formattedDate,
        time: dateTime.formattedTime,
        venue_id: 0,
        home_id: 0,
        away_id: 0,
        home_score: page === 'results' ? Number(homeScore) : 0,
        away_score: page === 'results' ? Number(awayScore) : 0,
        game_status_id: page === 'results' ? 2 : 0,
        score_status_id: page === 'results' ? 1 : 0,
        home_name: this.teamService.getName(lookupTeam(homeTeam)),
        home_short: this.teamService.getShortName(lookupTeam(homeTeam)),
        away_name: this.teamService.getName(lookupTeam(awayTeam)),
        away_short: this.teamService.getShortName(lookupTeam(awayTeam)),
        home_logo: this.teamService.getLogo(lookupTeam(homeTeam)),
        away_logo: this.teamService.getLogo(lookupTeam(awayTeam)),
        venue_name: this.venueService.getName(this.teamService.getVenue(lookupTeam(homeTeam))),
        venue_short: this.venueService.getShortName(this.teamService.getVenue(lookupTeam(homeTeam))),
        venue_city: this.venueService.getCity(this.teamService.getVenue(lookupTeam(homeTeam))),
        game_number: game.id,
        serie_id: competition.serieId,
        serie_name: competition.name,
        serie_short: competition.name,
        referees: [],
        has_detail: true,
        home_team_pin: '',
        away_team_pin: '',
        match_code: '',
        venue_street: this.venueService.getStreet(this.teamService.getVenue(lookupTeam(homeTeam))),
        venue_zip: this.venueService.getZip(this.teamService.getVenue(lookupTeam(homeTeam))),
      } as GameModel
    })
  }

  public getAllCompetitions(): TeamCompetition[] {
    return FLASHSCORE_BASED_COMPETITIONS
  }

  public async getCompetitionRanking(competition: TeamCompetition): Promise<RankModel[]> {
    const data = await this.flashScoreService.getGames(competition, 'results')

    if (data.length === 0) return []

    const emptyRanking = new Map<string, RankModel>(Array.from(teamMapping.values()).map((fullName) => ([fullName, {
      id: 0,
      name: this.teamService.getName(fullName),
      short: this.teamService.getShortName(fullName),
      logo: this.teamService.getLogo(fullName),
      played: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      scored: 0,
      conceded: 0,
      difference: 0,
      points: 0,
      results: [],
      position: 0,
    } as RankModel])))

    const ranking: Map<string, RankModel> = data.reduce((acc: Map<string, RankModel>, game: FlashScoreGame) => {
      const homeRow = acc.get(lookupTeam(game.homeTeam)) as RankModel
      const awayRow = acc.get(lookupTeam(game.awayTeam)) as RankModel
      const winner = game.homeScore < game.awayScore ? awayRow : (game.homeScore > game.awayScore ? homeRow : null)
      const loser = winner == null ? null : (homeRow === winner ? awayRow : homeRow)
      if (winner == null || loser == null) {
        homeRow.points++
        homeRow.draws++
        homeRow.results.unshift('D')
        awayRow.points++
        awayRow.draws++
        awayRow.results.unshift('D')
      } else {
        winner.points += 2
        winner.wins++
        winner.results.unshift('W')
        loser.losses++
        loser.results.unshift('L')
      }
      homeRow.played++
      homeRow.scored += game.homeScore
      homeRow.conceded += game.awayScore
      awayRow.played++
      awayRow.scored += game.awayScore
      awayRow.conceded += game.homeScore

      homeRow.difference = homeRow.scored - homeRow.conceded
      awayRow.difference = awayRow.scored - awayRow.conceded
      return acc
    }, emptyRanking)

    let rank = 0
    return Array.from(ranking.values()).sort((team1: RankModel, team2: RankModel) => {
      if (team1.points === team2.points) {
        if (team1.wins === team2.wins) {
          if (team1.difference === team2.difference) {
            if (team1.scored === team2.scored) {
              return team2.name.localeCompare(team1.name)
            }
            return team2.scored - team1.scored
          }
          return team2.difference - team1.difference
        }
        return team2.wins - team1.wins
      }
      return team2.points - team1.points
    }).map((team) => {
      team.position = ++rank
      return team
    })
  }
}

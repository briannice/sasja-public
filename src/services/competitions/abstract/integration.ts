import { GameModel, RankModel, TeamCompetition } from '@/types/models'
import { CompetitionIntegration } from '@/services/competitions/competition'
import { getDateRangeForGamesOverview } from '@/utils/date'

export abstract class AbstractCompetitionIntegration implements CompetitionIntegration {
  abstract getCompetitionCalendarFull(competition: TeamCompetition): Promise<GameModel[]>

  abstract getAllCompetitions(): TeamCompetition[]

  abstract getCompetitionRanking(competition: TeamCompetition): Promise<RankModel[]>

  public async getCompetitionCalendar(competition: TeamCompetition): Promise<GameModel[]> {
    return this.getCompetitionCalendarFull(competition)
      .then((games) =>
        games.filter((game) => {
          return this.isSasjaGame(game.home_name, game.away_name)
        }),
      )
  }

  public async getFutureGames(): Promise<GameModel[]> {
    const [start_date] = getDateRangeForGamesOverview(0)
    const games = await Promise.all(
      this.getAllCompetitions().map((competition) =>
        this.getCompetitionCalendar(competition))
    )
    return games
      .flat()
      .filter((game) => {
        return new Date(game.date).getTime() >= new Date(start_date).getTime()
      })
  }

  public async getGameWeeks(weeks: number): Promise<GameModel[]> {
    const [start_date, end_date] = getDateRangeForGamesOverview(weeks)
    const games = await Promise.all(
      this.getAllCompetitions().map((competition) =>
        this.getCompetitionCalendar(competition))
    )
    return games
      .flat()
      .filter((game) => {
          const gameDate = new Date(game.date).getTime()
          return gameDate >= new Date(start_date).getTime() && gameDate <= new Date(end_date).getTime()
        },
      )
  }

  public isSasjaGame(home: string, away: string): boolean {
    return [home, away].some((name) => name && name.toLowerCase().includes('sasja'))
  }
}
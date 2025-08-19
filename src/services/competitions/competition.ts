import { GameDay, GameModel, GameWeek, RankModel, TeamCompetition } from '@/types/models'
import { getDateRangeForGamesOverview, getWeekNumberForGamesOverview } from '@/utils/date'
import { HBCompetitionIntegration } from '@/services/competitions/hb/integration'
import { SuperHandballLeageCompetitionIntegration } from '@/services/competitions/shl/integration'

const SHL = {
  name: 'Super Handball League',
  serieId: -1,
  vhvId: 0,
  ranking: true,
} as TeamCompetition

export const SHL_BASED_COMPETITIONS: TeamCompetition[] = [
  SHL,
]

export interface CompetitionIntegration {
  getCompetitionCalendar(competition: TeamCompetition, isAuthenticated: boolean): Promise<GameModel[]>

  getCompetitionCalendarFull(competition: TeamCompetition): Promise<GameModel[]>

  getFutureGames(): Promise<GameModel[]>

  getGameWeeks(weeks: number): Promise<GameModel[]>

  getCompetitionRanking(competition: TeamCompetition): Promise<RankModel[]>
}

const HB_INTEGRATION = new HBCompetitionIntegration()
const SHL_INTEGRATION = new SuperHandballLeageCompetitionIntegration()

function getCompetitionIntegration(competition: TeamCompetition): CompetitionIntegration {
  return SHL_BASED_COMPETITIONS.some(other => other.name == competition.name) ?
        SHL_INTEGRATION : HB_INTEGRATION
}

class CompetitionService {
  public getCompetitionCalendar(competition: TeamCompetition, isAuthenticated: boolean): Promise<GameModel[]> {
    return getCompetitionIntegration(competition).getCompetitionCalendar(competition, isAuthenticated)
  }

  public async getCompetitionCalendarFull(competition: TeamCompetition): Promise<GameDay[]> {
    const games = await getCompetitionIntegration(competition).getCompetitionCalendarFull(competition)

    const gameDays: GameDay[] = []
    let last_date = ''
    games.forEach((game) => {
      if (game.date === last_date) {
        gameDays[gameDays.length - 1].games.push(game)
      } else {
        gameDays.push({ date: game.date, games: [game] })
        last_date = game.date
      }
    })
    return gameDays
  }

  public async getFutureGames(): Promise<GameDay[]> {
    const games = await Promise.all([
      HB_INTEGRATION.getFutureGames(),
      // FILEBASED_INTEGRATION.getFutureGames(),
      // HANDBALNL_INTEGRATION.getFutureGames(),
      // SHL_INTEGRATION.getFutureGames(),
    ])
    const gamesByDate = games
      .flat()
      .reduce((acc, game) => {
        const key = game.date
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(game)
        return acc
      }, {} as { [key: string]: GameModel[] })
    return Object.entries(gamesByDate).map(
      ([date, games]) =>
        ({
          date: date,
          games: games.sort(
            (game1, game2) =>
              game1.time && game2.time ? game1.time.localeCompare(game2.time) : 0),
        }),
    ).sort(
      (day1, day2) =>
        day1.date.localeCompare(day2.date),
    )
  }

  public async getGameWeeks(weeks: number): Promise<GameWeek[]> {
    const [start_date] = getDateRangeForGamesOverview(weeks)
    const gameweeks: GameWeek[] = []
    for (let i = 0; i < weeks; i++) {
      gameweeks.push([])
    }

    const games = await Promise.all([
        HB_INTEGRATION.getGameWeeks(weeks),
        SHL_INTEGRATION.getGameWeeks(weeks),
      ],
    )
    games.flat().forEach((game) => {
      const weekNumber = getWeekNumberForGamesOverview(start_date, game.date)
      gameweeks[weekNumber] && gameweeks[weekNumber].push(game)
    })
    gameweeks.forEach((week) => {
      week.sort((game1, game2) =>
        game1.date.localeCompare(game2.date) !== 0 ?
          game1.date.localeCompare(game2.date) :
          (game1.time && game2.time ?
            game1.time.localeCompare(game2.time) :
            0),
      )
    })
    return gameweeks
  }

  public getCompetitionRanking(competition: TeamCompetition): Promise<RankModel[]> {
    return getCompetitionIntegration(competition).getCompetitionRanking(competition)
  }
}

export const competitionService = new CompetitionService()

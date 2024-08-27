import { GameDay, GameModel, GameWeek, RankModel, TeamCompetition } from '@/types/models'
import { FILE_BASED_COMPETITIONS } from '@/services/competitions/filebased/competitions'
import { HANDBALNL_BASED_COMPETITIONS } from '@/services/competitions/handbalnl/competitions'
import { getDateRangeForGamesOverview, getWeekNumberForGamesOverview } from '@/utils/date'
import { FileBasedCompetitionIntegration } from '@/services/competitions/filebased/service'
import { HandbalNlCompetitionIntegration } from '@/services/competitions/handbalnl/service'
import { HBCompetitionIntegration } from '@/services/competitions/hb/service'


export interface CompetitionIntegration {
  getCompetitionCalendar(competition: TeamCompetition): Promise<GameModel[]>

  getCompetitionCalendarFull(competition: TeamCompetition): Promise<GameModel[]>

  getFutureGames(): Promise<GameModel[]>

  getGameWeeks(weeks: number): Promise<GameModel[]>

  getCompetitionRanking(competition: TeamCompetition): Promise<RankModel[]>
}

const HB_INTEGRATION = new HBCompetitionIntegration()
const HANDBALNL_INTEGRATION = new HandbalNlCompetitionIntegration()
const FILEBASED_INTEGRATION = new FileBasedCompetitionIntegration()

function getCompetitionIntegration(competition: TeamCompetition): CompetitionIntegration {
  return FILE_BASED_COMPETITIONS.some(other => other.name === competition.name) ?
    FILEBASED_INTEGRATION :
    (HANDBALNL_BASED_COMPETITIONS.some(other => other.name === competition.name)) ?
      HANDBALNL_INTEGRATION :
      HB_INTEGRATION
}

class CompetitionService {
  public getCompetitionCalendar(competition: TeamCompetition): Promise<GameModel[]> {
    return getCompetitionIntegration(competition).getCompetitionCalendar(competition)
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
    const games = await Promise.all([HB_INTEGRATION.getFutureGames(), FILEBASED_INTEGRATION.getFutureGames(), HANDBALNL_INTEGRATION.getFutureGames()])
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
        FILEBASED_INTEGRATION.getGameWeeks(weeks),
        HANDBALNL_INTEGRATION.getGameWeeks(weeks),
      ],
    )
    games.flat().forEach((game) => {
      const weekNumber = getWeekNumberForGamesOverview(start_date, game.date)
      gameweeks[weekNumber] && gameweeks[weekNumber].push(game)
    })

    return gameweeks
  }

  public getCompetitionRanking(competition: TeamCompetition): Promise<RankModel[]> {
    return getCompetitionIntegration(competition).getCompetitionRanking(competition)
  }
}

export const competitionService = new CompetitionService()

import { GameWeek } from '@/types/models'

import { getDateRangeForGamesOverview, getWeekNumberForGamesOverview } from '@/utils/date'
import { getHandballBelgiumGameweeks } from '@/services/hb/calendar'
import { getFileBasedGameweeks } from '@/services/filebased/calendar'

export const getGameweeks = async (weeks: number) => {
  const [start_date] = getDateRangeForGamesOverview(weeks)
  return Promise.all([getHandballBelgiumGameweeks(weeks), getFileBasedGameweeks(weeks)])
    .then((games) => games.flat())
    .then((games) => {
      const gameweeks: GameWeek[] = []

      for (let i = 0; i < weeks; i++) {
        gameweeks.push([])
      }

      games.forEach((game) => {
        const weekNumber = getWeekNumberForGamesOverview(start_date, game.date)
        gameweeks[weekNumber] && gameweeks[weekNumber].push(game)
      })

      return gameweeks
    })


}
import { HandballBelgiumApi } from '@/services/hb'
import { GameDay, GameModel } from '@/types/models'
import { getDateRangeForGamesOverview } from '@/utils/date'

const INVALID_SERIE_IDS = [83]

export const getHandballBelgiumGames = async (weeks: number) => {
  const [start_date, end_date] = getDateRangeForGamesOverview(weeks)

  const { data, status } = await HandballBelgiumApi.get(
    `ng/game/byMyLeague?with_referees=false&no_forfeit=true&season_id=2&without_in_preparation=true&sort%5B0%5D=date&sort%5B1%5D=time&club_id=24&start_date=${start_date}&end_date=${end_date}`
  )

  if (status !== 200) return []

  const games: GameModel[] = data.elements.map((e: any) => ({
    id: e.id,
    date: e.date,
    time: e.time || null,
    venue_id: e.venue_id || null,
    home_score: e.home_score || 0,
    away_score: e.away_score || 0,
    home_id: e.home_team_id,
    away_id: e.away_team_id,
    game_status_id: e.game_status_id,
    score_status_id: e.score_status_id,
    home_name: e.home_team_name,
    home_short: e.home_team_short_name,
    away_name: e.away_team_name,
    away_short: e.away_team_short_name,
    home_logo: e.home_club_logo_img_url || null,
    away_logo: e.away_club_logo_img_url || null,
    venue_name: e.venue_name || '',
    venue_short: e.venue_short_name || '',
    venue_city: e.venue_city || '',
    game_number: e.reference.replace('URBH-KBHB', '').replace('VHV', '').replace('AVBP', ''),
    serie_id: e.serie_id,
    serie_name: e.serie_name,
    serie_short: e.serie_short_name,
  }))

  if (games.length === 0) return []

  const gameDays: GameDay[] = []

  let last_date = ''
  games.forEach((game) => {
    if (!INVALID_SERIE_IDS.includes(game.serie_id)) {
      if (game.serie_id)
        if (game.date === last_date) {
          gameDays[gameDays.length - 1].games.push(game)
        } else {
          gameDays.push({ date: game.date, games: [game] })
          last_date = game.date
        }
    }
  })

  return gameDays
}

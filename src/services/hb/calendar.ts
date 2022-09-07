import { HandballBelgiumApi } from '@/services/hb'
import { GameModel } from '@/types/models'

export const getHandballBelgiumCalendar = async (serieId: number) => {
  const { data, status } = await HandballBelgiumApi(
    `ng/game/byMyLeague?season_id=2&serie_id=${serieId}&club_id=24&with_referees=false&without_in_preparation=true&sort=game_date_time`
  )

  if (status !== 200) return []

  return [...data.elements] as GameModel[]
}

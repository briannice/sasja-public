import { HandballBelgiumApi } from '@/services/hb'
import { RankModel } from '@/types/models'

export const getHandballBelgiumRanking = async (serie_id: number) => {
  const { data, status } = await HandballBelgiumApi.get(
    `ng/ranking?serie_id=${serie_id}&sort=position`
  )

  if (status !== 200) return []

  return [...data.elements] as RankModel[]
}
